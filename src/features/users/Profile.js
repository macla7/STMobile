import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CScrollBackground, CContentTile } from "../layout/LayoutComponents";
import {
  Heading,
  Button,
  VStack,
  Pressable,
  Image,
  Box,
  HStack,
  Center,
  FormControl,
  Input,
  Text,
} from "native-base";
import { Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { selectUserId, selectUserAvatarUrl } from "../sessions/sessionSlice";
import { fetchUserAsync, selectUser, updateUserAsync } from "./userSlice";

function Profile() {
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const [image, setImage] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [formData, setFormData] = useState({ name: user.name });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const userAvatarUrl = useSelector(selectUserAvatarUrl);

  useEffect(() => {
    dispatch(fetchUserAsync(userId));
  }, []);

  useEffect(() => {
    setFormData({ name: user.name });
  }, [user]);

  // Method from expo docs https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setEditingProfile(true);
    }
  };

  function cancelEditing() {
    setEditingName(false);
    setEditingProfile(false);
    setFormData({ ...formData, name: user.name });
    setImage(null);
  }

  function submitUser() {
    const data = new FormData();
    data.append("user[id]", userId);
    data.append("user[name]", formData.name);

    if (image) {
      let uriParts = image.split(".");
      let fileType = uriParts[uriParts.length - 1];

      data.append("user[avatar]", {
        uri: image,
        name: `profilePictureUser${userId}.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    dispatch(updateUserAsync(data));
  }

  const validate = () => {
    if (formData.name === undefined || formData.name === "") {
      setErrors({ ...errors, name: "Name is required" });
      return false;
    } else if (formData.name.length < 3) {
      setErrors({ ...errors, name: "Name is too short" });
      return false;
    }
    submitUser();
    setEditingProfile(false);
    return true;
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <CScrollBackground>
        <VStack h="100%" w="100%">
          <CContentTile>
            {/* Profile Picture */}
            <HStack justifyContent="space-between" w="100%">
              <Center>
                <Heading
                  size="md"
                  fontWeight="600"
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                >
                  Profile Picture
                </Heading>
              </Center>

              <Center>
                <Button
                  onPress={pickImage}
                  variant="unstyled"
                  _text={{
                    color: "indigo.700",
                  }}
                >
                  Edit
                </Button>
              </Center>
            </HStack>

            <Pressable onPress={pickImage}>
              <Box shadow="3">
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                    alt="prospective dp"
                    borderRadius="100"
                  />
                ) : (
                  <Image
                    source={{
                      uri: userAvatarUrl,
                    }}
                    style={{ width: 200, height: 200 }}
                    alt="avatar"
                    borderRadius="100"
                  />
                )}
              </Box>
            </Pressable>

            {/* Name */}
            <HStack justifyContent="space-between" w="100%">
              <Center>
                <Heading
                  size="md"
                  fontWeight="600"
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                >
                  Name
                </Heading>
              </Center>

              <Center>
                <Button
                  onPress={() => {
                    setEditingName(true);
                  }}
                  variant="unstyled"
                  _text={{
                    color: "indigo.700",
                  }}
                >
                  Edit
                </Button>
              </Center>
            </HStack>

            <HStack w="100%">
              {editingName ? (
                <FormControl isRequired isInvalid={"name" in errors}>
                  <Input
                    onChangeText={(value) => {
                      setEditingProfile(true);
                      setFormData({ ...formData, name: value });
                    }}
                    value={formData.name}
                  />
                  {"name" in errors ? (
                    <FormControl.ErrorMessage>
                      {errors.name}
                    </FormControl.ErrorMessage>
                  ) : (
                    <FormControl.HelperText>
                      Name should contain atleast 3 character.
                    </FormControl.HelperText>
                  )}
                </FormControl>
              ) : (
                <Text>{user.name}</Text>
              )}
            </HStack>

            {/* Email */}
            <HStack justifyContent="space-between" w="100%">
              <Center h="41">
                <Heading
                  size="md"
                  fontWeight="600"
                  color="coolGray.800"
                  _dark={{
                    color: "warmGray.50",
                  }}
                >
                  Email
                </Heading>
              </Center>
            </HStack>

            <HStack w="100%">
              <Text>{user.email}</Text>
            </HStack>
          </CContentTile>

          {/* Buttons */}
          {editingProfile ? (
            <>
              <Button
                w="100%"
                colorScheme="indigo"
                onPress={() => {
                  onSubmit();
                }}
              >
                Save
              </Button>
              <Button
                w="100%"
                colorScheme="indigo"
                onPress={() => {
                  cancelEditing();
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            ""
          )}
        </VStack>
      </CScrollBackground>
    </Pressable>
  );
}

export default Profile;
