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
            <DP uri={`${props.comment.avatar_url}`} size={40} />
          </Box>
        ) : (
          ""
        )}
        <VStack ml="2">
          <Box bgColor="myBorderGray" borderRadius="15" px="2" py="1">
            <Text color="myDarkGrayText" bold>
              {props.comment.commentor_name}
            </Text>
            <Text>{props.comment.body}</Text>
          </Box>
          <Text fontSize="2xs" px="2" color="myMidGrayText" py="1">
            {format(new Date(props.comment.created_at), "d MMM")}
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default Comment;
