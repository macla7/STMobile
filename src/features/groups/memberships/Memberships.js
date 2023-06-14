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
            <HStack flex="1">
              {item.user.avatar_url ? (
                <DP uri={`${item.user.avatar_url}`} size={40} />
              ) : (
                ""
              )}
              <VStack ml="2" flex="1">
                <HStack justifyContent="space-between">
                  <VStack>
                    <Text color="myDarkGrayText" bold>
                      {item.user.name}
                    </Text>
                    <Text color="myMidGrayText">
                      {item.role == "admin" ? "Admin" : "member"}
                    </Text>
                  </VStack>
                  <Text fontSize="xs" color="myDarkGrayText">
                    Since {since(item)}
                  </Text>
                </HStack>

                <Text color="myMidGrayText">{item.user.email}</Text>
              </VStack>
            </HStack>
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default Memberships;
