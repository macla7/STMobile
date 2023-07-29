import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createInviteAsync,
  setNotice,
  selectToBeActioned,
  selectToBeConfirmed,
} from "./invites/inviteSlice";
import { Button } from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import BidCheckboxListing from "./BidCheckboxListing";

function ConfirmBids({ navigation, route }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const toBeActioned = useSelector(selectToBeActioned);
  const toBeConfirmed = useSelector(selectToBeConfirmed);
  const dispatch = useDispatch();
  const { bids } = route.params;

  function requestToJoinGroups(groups) {
    groups.forEach((group) => {
      let inviteDetails = {
        group_id: group.id,
        internal_user_id: null,
        external_user_id: userId,
        request: true,
      };
      dispatch(createInviteAsync(inviteDetails));
    });
  }

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        {/* <CheckboxListing items={toBeConfirmed} /> */}
        <BidCheckboxListing items={bids} />

        <Button
          variant="myButtonYellowVariant"
          onPress={() => {
            // requestToJoinGroups(toBeActioned);
            // dispatch(setNotice("Request sent"));
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
