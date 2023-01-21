import React from "react";
import { Text } from "native-base";
import { formatDistanceToNow } from "date-fns";

function PostEnds(props) {
  return (
    <Text>Time Remaining: {formatDistanceToNow(new Date(props.endsAt))}</Text>
  );
}

export default PostEnds;
