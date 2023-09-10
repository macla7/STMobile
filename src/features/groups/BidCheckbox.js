import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, HStack, Center, CloseIcon } from "native-base";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { selectToBeActioned, setToBeActioned } from "../posts/postSlice";
import Bid from "../posts/bids/Bid";

function BidCheckbox({ item }) {
  const dispatch = useDispatch();
  const toBeActioned = useSelector(selectToBeActioned);
  const [approved, setApproved] = useState(isApproved(item));
  const [notApproved, setNotApproved] = useState(isNotApproved(item));

  useEffect(() => {
    setApproved(isApproved(item));
    setNotApproved(isNotApproved(item));
    // resetActionedAltered();
  }, [toBeActioned]);

  function adjustActionList(item) {
    if (isApproved(item)) {
      // Remove the item with the same id from toBeActioned
      const updatedToBeActioned = toBeActioned.filter(
        (actionedItem) => actionedItem.id !== item.id
      );
      dispatch(setToBeActioned(updatedToBeActioned));
      // Add the modified item with approved set to false
      dispatch(
        setToBeActioned([...updatedToBeActioned, { ...item, approved: null }])
      );
    } else {
      // Remove the item with the same id from toBeActioned
      const updatedToBeActioned = toBeActioned.filter(
        (actionedItem) => actionedItem.id !== item.id
      );
      dispatch(setToBeActioned(updatedToBeActioned));
      // Add the modified item with approved set to true
      dispatch(
        setToBeActioned([...updatedToBeActioned, { ...item, approved: true }])
      );
    }
  }

  function adjustActionListForNotApproved(item) {
    if (isNotApproved(item)) {
      // Remove the item with the same id from toBeActioned
      const updatedToBeActioned = toBeActioned.filter(
        (actionedItem) => actionedItem.id !== item.id
      );
      dispatch(setToBeActioned(updatedToBeActioned));
      // Add the modified item with approved set to false
      dispatch(
        setToBeActioned([...updatedToBeActioned, { ...item, approved: null }])
      );
    } else {
      // Remove the item with the same id from toBeActioned
      const updatedToBeActioned = toBeActioned.filter(
        (actionedItem) => actionedItem.id !== item.id
      );
      dispatch(setToBeActioned(updatedToBeActioned));
      // Add the modified item with approved set to true
      dispatch(
        setToBeActioned([...updatedToBeActioned, { ...item, approved: false }])
      );
    }
  }

  function isApproved(item) {
    return toBeActioned.some((actionedItem) => {
      return actionedItem.id === item.id && actionedItem.approved == true;
    });
  }

  function isNotApproved(item) {
    return toBeActioned.some((actionedItem) => {
      return actionedItem.id === item.id && actionedItem.approved == false;
    });
  }

  return (
    <HStack mx="8">
      <Box flex={3}>
        <Bid bid={item} key={item.id} bidNum={item.id} reserve={false} />
      </Box>
      <Center flex={1}>
        <Box>
          <BouncyCheckbox
            size={30}
            isChecked={approved}
            onPress={() => adjustActionList(item)}
            fillColor="#4243ed"
            disableBuiltInState
            iconStyle={{ margin: 0 }}
          />
        </Box>
      </Center>
      <Center flex={1}>
        <Box>
          <BouncyCheckbox
            iconComponent={<CloseIcon color="#f5f5f5" />}
            size={30}
            isChecked={notApproved}
            onPress={() => adjustActionListForNotApproved(item)}
            fillColor="#EC3186"
            disableBuiltInState
            iconStyle={{ margin: 0 }}
          />
        </Box>
      </Center>
    </HStack>
  );
}

export default BidCheckbox;
