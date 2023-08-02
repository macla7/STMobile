import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectToBeActioned,
  setToBeActioned,
  updateBidAsync,
  fetchPostAsync,
  selectPost,
} from "../posts/postSlice";
import { Button } from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import BidCheckboxListing from "./BidCheckboxListing";

function ConfirmBids({ navigation, route }) {
  const toBeActioned = useSelector(selectToBeActioned);
  const dispatch = useDispatch();
  const { postId } = route.params;
  const post = useSelector(selectPost);

  function updateBidsForApprovals(bids) {
    const updatedBids = bids.map((bid) => ({
      approved: bid.approved,
      id: bid.id,
    }));
    dispatch(updateBidAsync({ post_id: postId, updated_bids: updatedBids }));
  }

  useEffect(() => {
    dispatch(fetchPostAsync(postId));
  }, []);

  useEffect(() => {
    dispatch(setToBeActioned(post.bids));
  }, [post]);

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <BidCheckboxListing items={post.bids} />

        <Button
          variant="myButtonYellowVariant"
          onPress={() => {
            updateBidsForApprovals(toBeActioned);
            navigation.goBack();
          }}
          w="90%"
          borderRadius="6"
          mb="6"
          mt="2"
        >
          Confirm
        </Button>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default ConfirmBids;
