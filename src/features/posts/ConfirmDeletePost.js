import React, { useEffect, useState } from "react";
import { Button, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import { updatePostAsync, selectDeleting, setDeleting } from "./postSlice";

function ConfirmDeletePost({ route, navigation }) {
  const { returnScreen } = route.params;
  const dispatch = useDispatch();
  const [isDeletingNow, setIsDeletingNow] = useState(false);
  const deleting = useSelector(selectDeleting);
  const { postId } = route.params;

  useEffect(() => {
    if (deleting == "Up To Date") {
      setIsDeletingNow(false);
      dispatch(setDeleting("Not Fetched"));
      navigation.navigate(returnScreen);
    }
  }, [deleting]);

  async function updatePost() {
    let postDetails = {
      id: postId,
      post: {
        hide: true,
      },
    };

    setIsDeletingNow(true);
    dispatch(updatePostAsync(postDetails));
  }

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <Text>Do you want to permanently this post?</Text>
        <Button
          my="2"
          color="white"
          bgColor="myPink"
          onPress={() => {
            updatePost();
          }}
        >
          Confirm
        </Button>
        {isDeletingNow ? <Text bold>Deleting.. Please wait</Text> : null}
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default ConfirmDeletePost;
