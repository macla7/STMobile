import React from "react";
import { FlatList } from "native-base";
import Checkbox from "./Checkbox";

function CheckboxListing({ items }) {
  return (
    <FlatList
      w="100%"
      data={items}
      renderItem={({ item }) => <Checkbox item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}

export default CheckboxListing;
