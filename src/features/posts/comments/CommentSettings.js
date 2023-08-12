import React from "react";
import { Text, HStack, DeleteIcon, Pressable, Center } from "native-base";
import { CBackground } from "../../layout/LayoutComponents";

function CommentSettings({ route, navigation }) {
  const { commentId, postId } = route.params;
  return (
    <CBackground>
      <Center py="2">
        <Pressable
          onPress={() => {
            navigation.navigate("Confirm Delete Comment", {
              returnScreen: "Post",
              commentId: commentId,
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
              Delete Comment
            </Text>
          </HStack>
        </Pressable>
      </Center>
    </CBackground>
  );
}

export default CommentSettings;
