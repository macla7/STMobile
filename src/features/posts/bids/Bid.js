import React from "react";
import { VStack, HStack, Text, Box } from "native-base";
import Money from "../money/Money";
import { formatDistanceToNow } from "date-fns";
import DP from "../../layout/DP";

function Bid(props) {
  function approvedText(approved, reserve) {
    if (reserve !== true) {
      if (approved == true) {
        return "Approved";
      } else if (approved == false) {
        return "Denied";
      } else {
        return "";
      }
    }
    return "";
  }
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      customerFlex={props.flexGrow ? props.flexGrow : 1}
      shadow="1"
      flexDirection="row"
      bgColor={props.bid.price < 0 ? "myPink" : "myYellow"}
      p="1"
      mb="1"
      mx="1"
      borderRadius="9"
    >
      <VStack flexGrow={1}>
        <HStack justifyContent="space-between" flexGrow={1}>
          {props.bid.avatar_url ? (
            <DP uri={`${props.bid.avatar_url}`} size={40} />
          ) : (
            ""
          )}
          <Box ml="2" flexGrow={1}>
            <VStack justifyContent="flex-start" flexGrow={1}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text
                  fontSize="2xs"
                  color={props.bid.price < 0 ? "myPinkText" : "myYellowText"}
                >
                  {props.bid.bidder_name}
                </Text>
              </HStack>
              <HStack>
                <Text
                  color={props.bid.price < 0 ? "myPinkText" : "myYellowText"}
                >
                  {props.reserve == true
                    ? props.bid.price < 0
                      ? "Will Pay "
                      : "Asks for "
                    : props.bid.price == 0
                    ? "Will work for free"
                    : props.bid.price < 0
                    ? "Wants "
                    : "Offers "}
                </Text>
                {props.bid.price == 0 && props.reserve == true ? (
                  <Text
                    color={props.bid.price < 0 ? "myPinkText" : "myYellowText"}
                  >
                    nothing
                  </Text>
                ) : props.bid.price == 0 ? (
                  ""
                ) : (
                  <Money
                    microDollars={props.bid.price}
                    color={props.bid.price < 0 ? "myPinkText" : "myYellowText"}
                  />
                )}
              </HStack>
            </VStack>
          </Box>
        </HStack>
        <HStack flexGrow={1} justifyContent="space-between" alignItems="center">
          <Text
            fontSize="2xs"
            color={props.bid.price < 0 ? "myPinkText" : "myYellowText"}
          >
            {props.reserve == true
              ? ""
              : formatDistanceToNow(new Date(props.bid.created_at), {
                  addSuffix: true,
                })}
          </Text>
          <Text
            fontSize="2xs"
            color={props.bid.price < 0 ? "myPinkText" : "myYellowText"}
          >
            {approvedText(props.bid.approved, props.reserve)}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Bid;
