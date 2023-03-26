import React from "react";
import { Box } from "native-base";
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
