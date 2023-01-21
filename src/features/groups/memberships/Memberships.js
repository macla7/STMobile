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
          _dark={{
            borderColor: "gray.600",
          }}
          borderColor="coolGray.200"
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
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.user.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.role == "admin" ? "Admin" : "member"}
                </Text>
              </VStack>
            </HStack>
            <Text
              fontSize="xs"
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
            >
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
