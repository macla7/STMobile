import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  VStack,
  HStack,
  Text,
  Center,
  Pressable,
  Spacer,
} from "native-base";
import DP from "../layout/DP";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  selectInvitesAndRequestsPending,
  setToBeActioned,
  selectToBeActioned,
} from "./invites/inviteSlice";
import Money from "../posts/money/Money";
import { formatDistanceToNow } from "date-fns";
import Bid from "../posts/bids/Bid";

function BidCheckbox({ item }) {
  // const dispatch = useDispatch();
  // const toBeActioned = useSelector(selectToBeActioned);
  // const bouncyCheckboxRef = useRef();
  // const invitesAndRequestsPending = useSelector(
  //   selectInvitesAndRequestsPending
  // );
  // const [checked, setChecked] = useState(isChecked(item));
  // const [pending, setPending] = useState(isPending(item));

  // function isPending(item) {
  //   // Check if the item.id is present in invitesAndRequestsPending
  //   return invitesAndRequestsPending.some((pendingItem) => {
  //     return pendingItem.group_id === item.id;
  //   });
  // }

  // function pendingText(item) {
  //   const foundInviteModel = invitesAndRequestsPending.find(
  //     (invite) => invite.group_id === item.id
  //   );

  //   if (foundInviteModel) {
  //     return foundInviteModel.request ? "request" : "Invite";
  //   } else {
  //     return null; // Return null or any other value indicating that the invite model with the matching 'group_id' was not found.
  //   }
  // }

  // useEffect(() => {
  //   setChecked(isChecked(item));
  //   setPending(isPending(item));
  // }, [toBeActioned.length, invitesAndRequestsPending.length]);

  // function adjustActionList(item) {
  //   if (isChecked(item)) {
  //     removeFromToBeActioned(item);
  //   } else {
  //     addToBeActioned(item);
  //   }
  // }

  // function addToBeActioned(item) {
  //   dispatch(setToBeActioned([...toBeActioned, item]));
  // }

  // function removeFromToBeActioned(item) {
  //   dispatch(setToBeActioned(toBeActioned.filter((obj) => obj.id !== item.id)));
  // }

  // function isChecked(item) {
  //   return toBeActioned.some((actionedItem) => {
  //     return actionedItem.id === item.id;
  //   });
  //   return false;
  // }

  return (
    <HStack mx="8">
      <Box flex={2}>
        <Bid bid={item} key={item.id} bidNum={item.id} reserve={false} />
      </Box>
      <Center flex={1}>
        <Box>
          <BouncyCheckbox
            size={30}
            isChecked={false}
            fillColor="#3433E2"
            disableBuiltInState
            iconStyle={{ margin: 0 }}
          />
        </Box>
      </Center>
    </HStack>
  );
}

export default BidCheckbox;
