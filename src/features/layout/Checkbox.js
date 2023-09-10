import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, VStack, HStack, Text, Center, Pressable } from "native-base";
import DP from "../layout/DP";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {
  selectInvitesAndRequestsPending,
  setToBeActioned,
  selectToBeActioned,
} from "../groups/invites/inviteSlice";

function Checkbox({ item }) {
  const dispatch = useDispatch();
  const toBeActioned = useSelector(selectToBeActioned);
  const bouncyCheckboxRef = useRef();
  const invitesAndRequestsPending = useSelector(
    selectInvitesAndRequestsPending
  );
  const [checked, setChecked] = useState(isChecked(item));
  const [pending, setPending] = useState(isPending(item));

  function isPending(item) {
    // Check if the item.id is present in invitesAndRequestsPending
    return invitesAndRequestsPending.some((pendingItem) => {
      return pendingItem.group_id === item.id;
    });
  }

  function pendingText(item) {
    const foundInviteModel = invitesAndRequestsPending.find(
      (invite) => invite.group_id === item.id
    );

    if (foundInviteModel) {
      return foundInviteModel.request ? "request" : "Invite";
    } else {
      return null; // Return null or any other value indicating that the invite model with the matching 'group_id' was not found.
    }
  }

  useEffect(() => {
    setChecked(isChecked(item));
    setPending(isPending(item));
  }, [toBeActioned.length, invitesAndRequestsPending.length]);

  function adjustActionList(item) {
    if (isChecked(item)) {
      removeFromToBeActioned(item);
    } else {
      addToBeActioned(item);
    }
  }

  function addToBeActioned(item) {
    dispatch(setToBeActioned([...toBeActioned, item]));
  }

  function removeFromToBeActioned(item) {
    dispatch(setToBeActioned(toBeActioned.filter((obj) => obj.id !== item.id)));
  }

  function isChecked(item) {
    return toBeActioned.some((actionedItem) => {
      return actionedItem.id === item.id;
    });
    return false;
  }

  return (
    <Pressable
      borderBottomWidth="1"
      borderColor="myBorderGray"
      mx="4"
      py="2"
      onPress={() => bouncyCheckboxRef.current?.onPress()}
    >
      <HStack justifyContent="space-between" overflow="hidden">
        <HStack flexShrink="1" flexGrow="0">
          {item.avatar_url ? <DP uri={`${item.avatar_url}`} size={40} /> : ""}
          <VStack>
            <Text ml="2" color="myDarkGrayText" bold>
              {item.name}
            </Text>
            <Text ml="2" color="myMidGrayText" overflow="hidden">
              {item.email
                ? item.email
                : item.number_of_memberships + " members"}
            </Text>
          </VStack>
        </HStack>
        <Center flexShrink="0">
          {pending ? (
            <Center>
              <Text color="gray.600">{pendingText(item)}</Text>
              <Text color="gray.600">pending</Text>
            </Center>
          ) : (
            <Box w="30" pr="8">
              <BouncyCheckbox
                size={30}
                ref={(ref) => (bouncyCheckboxRef.current = ref)}
                onPress={() => adjustActionList(item)}
                isChecked={checked}
                fillColor="#4243ed"
                disableBuiltInState
                iconStyle={{ margin: 0 }}
              />
            </Box>
          )}
        </Center>
      </HStack>
    </Pressable>
  );
}

export default Checkbox;
