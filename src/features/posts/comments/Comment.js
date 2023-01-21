import React from "react";
import { VStack, HStack, Text, Box } from "native-base";
import DP from "../../layout/DP";
import { format } from "date-fns";

function Comment(props) {
  return (
    <Box w="100%" mt="2" px="2">
      <HStack align-items="center">
        {props.comment.avatar_url ? (
          <Box py="1">
            <DP uri={`${props.comment.avatar_url}`} />
          </Box>
        ) : (
          ""
        )}
        <VStack ml="2">
          <Box bgColor="gray.200" borderRadius="15" px="2" py="1">
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
            >
              {props.comment.commentor}
            </Text>
            <Text>{props.comment.body}</Text>
          </Box>
          <Text fontSize="2xs" px="2" color="gray.600" py="1">
            {format(new Date(props.comment.created_at), "d MMM")}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default Comment;
