import React from "react";
import { Text, FlatList, VStack, HStack, Pressable } from "native-base";
import DP from "../../layout/DP";

function Memberships({ memberships, navigation }) {
  return (
    <FlatList
      w="100%"
      data={memberships}
      renderItem={({ item }) => (
        <Pressable
          borderBottomWidth="1"
          borderColor="myBorderGray"
          pl="4"
          pr="5"
          py="2"
          onPress={() => {
            navigation.navigate("Member Details", {
              member: item,
            });
          }}
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
                  </VStack>
                  <Text color="myMidGrayText">
                    {item.role == "admin" ? "Admin" : "Member"}
                  </Text>
                </HStack>

                <Text color="myMidGrayText">{item.user.email}</Text>
              </VStack>
            </HStack>
          </HStack>
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default Memberships;
