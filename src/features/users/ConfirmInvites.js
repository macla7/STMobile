import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createInviteAsync,
  selectToBeConfirmed,
  setNotice,
  setConfirmed,
  selectConfirmed,
} from "../groups/invites/inviteSlice";
import { Button } from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import CheckboxListing from "../layout/CheckboxListing";

function ConfirmInvites({ route, navigation }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const toBeConfirmed = useSelector(selectToBeConfirmed);
  const confirmed = useSelector(selectConfirmed);
  const dispatch = useDispatch();
  const { group } = route.params;

  function inviteUsers(users) {
    users.forEach((user) => {
      let inviteDetails = {
        group_id: group.id,
        internal_user_id: userId,
        external_user_id: user.id,
        request: false,
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
            inviteUsers(confirmed);
            dispatch(setNotice("Invites sent."));
            navigation.goBack();
          }}
          w="90%"
          borderRadius="6"
          mb="6"
          mt="2"
        >
          Invite
        </Button>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default ConfirmInvites;
