import React from "react";

import { Text, FlatList, VStack, Box, HStack } from "native-base";
import { parseISO, format } from "date-fns";
import DP from "../../layout/DP";

function Memberships({ memberships }) {
  function since(item) {
    return format(parseISO(item.created_at), "EEE do LLL").toString();
  }

  return (
    <FlatList
      w="100%"
      data={memberships}
      renderItem={({ item }) => (
        <Box
          borderBottomWidth="1"
          borderColor="myBorderGray"
          pl="4"
          pr="5"
          py="2"
        >
          <HStack justifyContent="space-between">
            <HStack>
              {item.user.avatar_url ? (
                <DP uri={`${item.user.avatar_url}`} />
              ) : (
                ""
              )}
              <VStack ml="2">
                <Text color="myDarkGrayText" bold>
                  {item.user.name}
                </Text>
                <Text color="myMidGrayText">
                  {item.role == "admin" ? "Admin" : "member"}
                </Text>
              </VStack>
            </HStack>
            <Text fontSize="xs" color="myDarkGrayText">
              Since {since(item)}
            </Text>
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default Memberships;
