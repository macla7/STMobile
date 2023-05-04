import React from "react";
import { Button, AspectRatio, View, ScrollView, VStack } from "native-base";
import Bid from "./Bid";
import BidIcon from "../../../assets/noun-auction-4831153-007435.svg";

function Bids(props) {
  let bids = [...props.bids];
  let sortedBids = bids.sort((a, b) => b.price - a.price);

  return (
    <VStack justifyContent="space-between">
      {sortedBids.length == 0 ? (
        // <AspectRatio ratio={{ base: 1 / 1, md: 1 / 1 }}>
        //   <BidIcon width="100%" height="100%" />
        // </AspectRatio>
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
  );
}

export default Bids;
