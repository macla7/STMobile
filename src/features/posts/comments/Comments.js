import React from "react";
import { VStack, HStack, Text, View, Box } from "native-base";
import { formatDistanceToNow } from "date-fns";
import DP from "../../layout/DP";
import { CInternalBorderTile } from "../../layout/LayoutComponents";
import Comment from "./Comment";

function Comments(props) {
  return (
    <Box borderTopWidth="1" borderColor="coolGray.200" w="100%" mb="2">
      {props.comments.map((item) => {
        return (
          <Comment comment={item} key={item.id} navigation={props.navigation} />
        );
      })}
    </Box>
  );
}

export default Comments;
