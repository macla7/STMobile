import React from "react";
import { VStack, HStack, Text, View, Box } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import Money from "../money/Money";
import { formatDistanceToNow } from "date-fns";
import DP from "../../layout/DP";
import { CInternalBorderTile } from "../../layout/LayoutComponents";

function Bid(props) {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      flex={1}
      shadow="1"
      flexDirection="row"
      bgColor={props.bid.price < 0 ? "lightBlue.200" : "green.200"}
      p="1"
      mb="1"
      mx="1"
      borderRadius="10"
      borderWidth="1"
      borderColor={props.bidNum == 0 ? "amber.200" : "coolGray.200"}
    >
      <VStack flexGrow={1}>
        <HStack justifyContent="space-between" flexGrow={1}>
          {props.bid.avatar_url ? <DP uri={`${props.bid.avatar_url}`} /> : ""}
          <Box ml="2" flexGrow={1}>
            <VStack justifyContent="flex-start" flexGrow={1}>
              <HStack>
                <Text
                  color={props.bid.price < 0 ? "lightBlue.800" : "green.800"}
                >
                  {props.bid.price < 0 ? "Asking " : "Offering "}
                </Text>
                <Money
                  microDollars={props.bid.price}
                  color={props.bid.price < 0 ? "lightBlue.800" : "green.800"}
                />
                <Text>{props.bidNum == 0 ? "🏆" : ""}</Text>
              </HStack>
              <Text fontSize="2xs">
                {props.reserve == true ? "Reserve" : props.bid.biddor}
              </Text>
            </VStack>
          </Box>
        </HStack>
        <HStack flexGrow={1}>
          <Text fontSize="2xs">
            {formatDistanceToNow(new Date(props.bid.created_at), {
              addSuffix: true,
            })}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  bid: {
    paddingHorizontal: 10,
    height: 25,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
});

export default Bid;
