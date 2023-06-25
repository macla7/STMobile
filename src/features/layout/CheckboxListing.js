import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, VStack, HStack, Text, FlatList, Center } from "native-base";
import DP from "../layout/DP";
import BouncyCheckbox from "react-native-bouncy-checkbox";

function CheckboxListing({ items, confirming, setState }) {
  const dispatch = useDispatch();
  const [itemList, setItemList] = useState({});
  const [toBeActioned, setToBeActioned] = useState(
    toBeActionedIfConfirming(items)
  );

  useEffect(() => {
    setItemList(items);
  }, [items.length]);

  useEffect(() => {
    dispatch(setState(toBeActioned));
  }, [toBeActioned.length]);

  function toBeActionedIfConfirming(items) {
    if (confirming) {
      return items;
    } else {
      return [];
    }
  }

  function adjustActionList(item) {
    if (isChecked(item)) {
      removeFromToBeActioned(item);
    } else {
      addToBeActioned(item);
    }
  }

  function addToBeActioned(item) {
    setToBeActioned((prevArray) => [...prevArray, item]);
  }

  function removeFromToBeActioned(item) {
    setToBeActioned(toBeActioned.filter((obj) => obj.id !== item.id));
  }

  function isChecked(item) {
    for (let i = 0; i < toBeActioned.length; i++) {
      if (toBeActioned[i].id === item.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <FlatList
      w="100%"
      data={itemList}
      renderItem={({ item }) => (
        <Box borderBottomWidth="1" borderColor="myBorderGray" mx="4" py="2">
          <HStack justifyContent="space-between" overflow="hidden">
            <HStack flexShrink="1" flexGrow="0">
              {item.avatar_url ? (
                <DP uri={`${item.avatar_url}`} size={40} />
              ) : (
                ""
              )}
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
            <Center flexShrink="0" bgColor="myBackgroundGray">
              <Box w="30" pr="8">
                <BouncyCheckbox
                  size={30}
                  onPress={() => adjustActionList(item)}
                  isChecked={isChecked(item)}
                  fillColor="#3433E2"
                  iconStyle={{ margin: 0 }}
                />
              </Box>
            </Center>
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default CheckboxListing;
