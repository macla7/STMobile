import React from "react";
import { VStack, HStack, Text, Box } from "native-base";
import Money from "../money/Money";
import { formatDistanceToNow } from "date-fns";
import DP from "../../layout/DP";

function Bid(props) {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      customerFlex={props.flexGrow ? props.flexGrow : 1}
      shadow="1"
      flexDirection="row"
      bgColor={props.bid.price < 0 ? "myPink" : "myLightGreen"}
      p="1"
      mb="1"
      mx="1"
      borderWidth="1"
      borderColor="black"
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
              <Text
                bold
                fontSize="2xs"
                color={props.bid.price < 0 ? "myLightGreen" : "myDarkGreen"}
              >
                {props.bid.bidder_name}
              </Text>
              <HStack>
                <Text
                  bold
                  color={props.bid.price < 0 ? "myLightGreen" : "myDarkGreen"}
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
                    bold
                    color={props.bid.price < 0 ? "myLightGreen" : "myDarkGreen"}
                  >
                    nothing
                  </Text>
                ) : props.bid.price == 0 ? (
                  ""
                ) : (
                  <Money
                    microDollars={props.bid.price}
                    color={props.bid.price < 0 ? "myLightGreen" : "myDarkGreen"}
                  />
                )}
              </HStack>
            </VStack>
          </Box>
        </HStack>
        <HStack flexGrow={1} justifyContent="space-between" alignItems="center">
          <Text
            bold
            fontSize="2xs"
            color={props.bid.price < 0 ? "myLightGreen" : "myDarkGreen"}
          >
            {props.reserve == true
              ? ""
              : formatDistanceToNow(new Date(props.bid.created_at), {
                  addSuffix: true,
                })}
          </Text>
          <Text fontSize="sm" color={props.bid.price < 0 ? "white" : "white"}>
            {props.bidNum == 0 ? "🏆" : ""}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Bid;
