import React from "react";
import { Box, VStack, HStack, Text, Pressable } from "native-base";
import { format } from "date-fns";
import { CInternalBorderTile } from "../../layout/LayoutComponents";

function Shift({ navigation, shifts, editable, invalidShiftIds }) {
  function getDays(item) {
    if (
      format(new Date(item.start), "EEE do LLL") !==
      format(new Date(item.end), "EEE do LLL")
    ) {
      return (
        <>
          <Text>Across Days:</Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            {format(new Date(item.start), "EEE do LLL")}
          </Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            {format(new Date(item.end), "EEE do LLL")}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text>Day:</Text>
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
          >
            {format(new Date(item.start), "EEE do LLL")}
          </Text>
        </>
      );
    }
  }
  return (
    <Box w="100%">
      {shifts.map((item, index) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              if (editable) {
                navigation.navigate("Add Shift", {
                  initPosition: item.position,
                  start: item.start,
                  end: item.end,
                  editingMode: editable,
                  tempId: item.tempId,
                  returnScreen: "Create Post",
                });
              }
            }}
          >
            <CInternalBorderTile
              borderColor={
                invalidShiftIds.includes(item.tempId)
                  ? "error.600"
                  : editable
                  ? "muted.300"
                  : "coolGray.200"
              }
            >
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.position}
                </Text>
                <HStack space={3} justifyContent="space-between">
                  <VStack>{getDays(item)}</VStack>
                  <VStack>
                    <Text>Time:</Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {format(new Date(item.start), "p")}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {format(new Date(item.end), "p")}
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </CInternalBorderTile>
          </Pressable>
        );
      })}
    </Box>
  );
}

export default Shift;
