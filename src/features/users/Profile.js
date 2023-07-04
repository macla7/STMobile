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
import * as ImagePicker from "expo-image-picker";
import { selectUserId, selectUserAvatarUrl } from "../sessions/sessionSlice";
import {
  fetchUserAsync,
  selectUser,
  updateUserAsync,
  destroyUserAsync,
} from "./userSlice";
import AtopTabNavGroup from "../buttons/AtopTabNavGroup";
import KeyboardWrapper from "../layout/KeyboardWrapper";

function Profile({ navigation }) {
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const [name, setName] = useState(user.name);
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
    setName(user.name);
    setImage(userAvatarUrl);
  }, [user, userAvatarUrl]);

  // Method from expo docs https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const pickImage = async () => {
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
    setFormData({ ...formData, name: name });
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

    setName(formData.name);
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
    setEditingName(false);
    return true;
  };

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  return (
    <KeyboardWrapper>
      <CScrollBackground>
        <VStack h="100%" w="100%">
          <CContentTile>
            {/* Profile Picture */}
            <HStack justifyContent="space-between" w="100%">
              <Center>
                <Heading size="md" fontWeight="600" color="myDarkGrayText">
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
                <Heading size="md" fontWeight="600" color="myDarkGrayText">
                  Name
                </Heading>
              </Center>

              <Center>
                <Button
                  onPress={() => {
                    setEditingName(true);
                    setEditingProfile(true);
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
                <Text>{name}</Text>
              )}
            </HStack>

            {/* Email */}
            <HStack justifyContent="space-between" w="100%">
              <Center h="41">
                <Heading size="md" fontWeight="600" color="myDarkGrayText">
                  Email
                </Heading>
              </Center>
            </HStack>

            <HStack w="100%">
              <Text>{user.email}</Text>
            </HStack>

            <HStack mt="8" pt="4" borderTopWidth="1" borderColor="myBorderGray">
              <Pressable
                w="100%"
                onPress={() => {
                  navigation.navigate("Delete Account");
                }}
              >
                <Text color="myPink">Delete Account</Text>
              </Pressable>
            </HStack>
          </CContentTile>

          {/* Buttons */}
          {editingProfile ? (
            <AtopTabNavGroup
              left="Save"
              right="Cancel"
              leftFunction={() => onSubmit()}
              rightFunction={() => cancelEditing()}
            />
          ) : (
            ""
          )}
        </VStack>
      </CScrollBackground>
    </KeyboardWrapper>
  );
}

export default Profile;
