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
      flex={1}
      shadow="1"
      flexDirection="row"
      bgColor={props.bid.price < 0 ? "myPink" : "myLightGreen"}
      p="1"
      mb="1"
      mx="1"
      borderWidth="1"
      borderColor="myBorderGray"
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
              <HStack>
                <Text bold color={props.bid.price < 0 ? "white" : "white"}>
                  {props.reserve == true
                    ? "Reserve "
                    : props.bid.price < 0
                    ? "Seeking "
                    : "Offering "}
                </Text>
                <Money
                  microDollars={props.bid.price}
                  color={props.bid.price < 0 ? "white" : "white"}
                />
                <Text>{props.bidNum == 0 ? "" : ""}</Text>
              </HStack>
              <Text
                bold
                fontSize="2xs"
                color={props.bid.price < 0 ? "white" : "white"}
              >
                {props.bid.bidder_name}
              </Text>
            </VStack>
          </Box>
        </HStack>
        <HStack flexGrow={1} justifyContent="space-between">
          <Text fontSize="2xs" color={props.bid.price < 0 ? "white" : "white"}>
            {props.reserve == true
              ? props.bid.price < 0
                ? "Maximum " + props.bid.bidder_name + " will pay"
                : "Minimum " + props.bid.bidder_name + " will accept"
              : formatDistanceToNow(new Date(props.bid.created_at), {
                  addSuffix: true,
                })}
          </Text>
          <Text fontSize="2xs" color={props.bid.price < 0 ? "white" : "white"}>
            {props.bidNum == 0 ? "⭐️" : ""}
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Bid;
