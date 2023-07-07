import React from "react";
import { Box, AspectRatio, View, ScrollView, VStack } from "native-base";
import Bid from "./Bid";
import BidIcon from "../../../assets/noun-auction-4831153-007435.svg";

function Bids(props) {
  let bids = [...props.bids];
  let sortedBids = bids.sort((a, b) => b.price - a.price);

  let ended = true;
  return (
    <Box opacity={props.ended ? "0.5" : "1"}>
      <VStack justifyContent="space-between">
        {sortedBids.length == 0 ? (
          <Bid
            bid={props.reserveBid}
            reserve={true}
            postorName={props.postor_name}
          />
        ) : (
          <ScrollView nestedScrollEnabled maxH="48">
            {sortedBids.map((item, i) => {
              return <Bid bid={item} key={item.id} bidNum={i} />;
            })}
            <Bid bid={props.reserveBid} reserve={true} />
          </ScrollView>
        )}
      </VStack>
    </Box>
  );
}

export default Bids;
