import React from "react";
import { FlatList, Box } from "native-base";
import BidCheckbox from "./BidCheckbox";

function BidCheckboxListing({ items }) {
  return (
    <FlatList
      m="4"
      w="100%"
      data={items}
      renderItem={({ item }) => <BidCheckbox item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

export default BidCheckboxListing;
