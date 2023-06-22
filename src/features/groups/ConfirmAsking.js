import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createInviteAsync,
  selectToBeConfirmed,
  setConfirmed,
  selectConfirmed,
} from "./invites/inviteSlice";

import { Button } from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import CheckboxListing from "../layout/CheckboxListing";

function ConfirmAsking({ navigation }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const toBeConfirmed = useSelector(selectToBeConfirmed);
  const confirmed = useSelector(selectConfirmed);
  const dispatch = useDispatch();

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
        <CheckboxListing
          items={toBeConfirmed}
          confirming={true}
          setState={setConfirmed}
        />

        <Button
          variant="myButtonYellowVariant"
          onPress={() => {
            requestToJoinGroups(confirmed);
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

export default ConfirmAsking;
