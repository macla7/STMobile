import React, { useEffect, useState } from "react";
import { Button, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../../layout/LayoutComponents";
import { updateCommentAsync, selectDeleting, setDeleting } from "../postSlice";

function ConfirmDeleteComment({ route, navigation }) {
  const { returnScreen, commentId, postId } = route.params;
  const dispatch = useDispatch();
  const [isDeletingNow, setIsDeletingNow] = useState(false);
  const deleting = useSelector(selectDeleting);

  useEffect(() => {
    if (deleting == "Up To Date") {
      setIsDeletingNow(false);
      dispatch(setDeleting("Not Fetched"));
      navigation.navigate(returnScreen, {
        returnScreen: "Home Feed",
        postId: postId,
      });
    }
  }, [deleting]);

  async function updateComment() {
    let commentDetails = {
      id: commentId,
      comment: {
        hide: true,
      },
    };

    setIsDeletingNow(true);
    dispatch(updateCommentAsync(commentDetails));
  }

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <Text>Do you want to permanently this comment?</Text>
        <Button
          my="2"
          color="white"
          bgColor="myPink"
          onPress={() => {
            updateComment();
          }}
        >
          Confirm
        </Button>
        {isDeletingNow ? <Text bold>Deleting.. Please wait</Text> : null}
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default ConfirmDeleteComment;
