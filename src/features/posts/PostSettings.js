import React from "react";
import { Text, HStack, DeleteIcon, Pressable, Center } from "native-base";
import { CBackground } from "../layout/LayoutComponents";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";

function PostSettings({ route, navigation }) {
  const { postId } = route.params;
  return (
    <CBackground>
      <Center py="2">
        {/* <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          borderRadius="6"
          p="4"
          w="90%"
          mb="1"
          mx="1"
          bgColor="white"
        >
          <HStack alignItems="center">
            <FontAwesomeIcon icon={faClock} color="#171717" />
            <Text ml="2">Change post ending time</Text>
          </HStack>
        </Pressable> */}
        <Pressable
          onPress={() => {
            navigation.navigate("Confirm Delete Post", {
              returnScreen: "Home Feed",
              postId: postId,
            });
          }}
          borderRadius="6"
          p="4"
          w="90%"
          mb="1"
          mx="1"
          bgColor="white"
        >
          <HStack alignItems="center">
            <DeleteIcon color="#171717" />
            <Text color="myPink" ml="2">
              Delete post
            </Text>
          </HStack>
        </Pressable>
      </Center>
    </CBackground>
  );
}

export default PostSettings;
