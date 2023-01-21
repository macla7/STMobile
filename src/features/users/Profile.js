import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CScrollBackground, CContentTile } from "../layout/LayoutComponents";
import { Heading, Button, VStack, Pressable, Image, Box } from "native-base";
import { Keyboard } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  selectUserId,
  selectUserAvatarUrl,
  logoutUserAsync,
} from "../sessions/sessionSlice";
import { fetchUserAsync, selectUser, updateUserAsync } from "./userSlice";

function Profile() {
  const userId = useSelector(selectUserId);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const userAvatarUrl = useSelector(selectUserAvatarUrl);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUserAsync(userId));
  }, []);

  // Method from expo docs https://docs.expo.dev/versions/latest/sdk/imagepicker/
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function onLogout() {
    dispatch(logoutUserAsync());
  }

  function onSubmit() {
    const formData = new FormData();
    let uriParts = image.split(".");
    let fileType = uriParts[uriParts.length - 1];

    formData.append("user[id]", userId);
    formData.append("user[avatar]", {
      uri: image,
      name: `profilePictureUser${userId}.${fileType}`,
      type: `image/${fileType}`,
    });
    // formData.append(
    //   "user[client_id]",
    //   "mBd4U-YMBIDZ-uM89ReLdszoMUCJ6WkdCHBuTuKForU"
    // );

    dispatch(updateUserAsync(formData));
  }

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <CScrollBackground>
        <VStack justifyContent="space-between" h="100%" w="100%">
          <CContentTile>
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              {user.name}
            </Heading>
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
            {/* <Text>{userAvatarUrl}</Text> */}
            <VStack w="100%">
              {image ? (
                <Button
                  mx="4"
                  mt="2"
                  colorScheme="indigo"
                  onPress={() => {
                    onSubmit();
                  }}
                >
                  Save Changes
                </Button>
              ) : (
                ""
              )}
            </VStack>
          </CContentTile>
          <Button
            colorScheme="indigo"
            onPress={() => onLogout()}
            mx="2"
            mt="2"
            mb="1"
          >
            Logout
          </Button>
        </VStack>
      </CScrollBackground>
    </Pressable>
  );
}

export default Profile;
