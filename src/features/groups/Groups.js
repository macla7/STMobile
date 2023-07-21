import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGroupsAsync, selectMyGroups } from "./groupSlice";
import { selectUserId } from "../sessions/sessionSlice";
import { Box, VStack, Button, HStack, Text, Pressable } from "native-base";
import { CScrollBackgroundRefresh } from "../layout/LayoutComponents";
import { useIsFocused } from "@react-navigation/native";
import AtopTabNavGroup from "../buttons/AtopTabNavGroup";

function Groups({ navigation }) {
  const myGroups = useSelector(selectMyGroups);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  // Called on initialise, because dispatch changes (on intialise)
  // and on myGroups.length change
  useEffect(() => {
    dispatch(fetchMyGroupsAsync());
  }, [dispatch, myGroups.length, isFocused]);

  function refresh() {
    dispatch(fetchMyGroupsAsync());
  }

  return (
    <CScrollBackgroundRefresh refreshAction={refresh}>
      {myGroups.map((item) => {
        return (
          <Pressable
            borderBottomWidth="1"
            borderColor="myBorderGray"
            pl="4"
            pr="5"
            py="2"
            key={item.id}
            onPress={() =>
              navigation.navigate("Group", {
                group: item,
              })
            }
          >
            <Box>
              <HStack space={3} justifyContent="space-between">
                <VStack w="100%">
                  <Text color="myDarkGrayText" bold>
                    {item.name}
                  </Text>
                  <Text color="myMidGrayText">
                    {item.number_of_memberships} members
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </Pressable>
        );
      })}

      <AtopTabNavGroup
        left="Discover"
        right="Greate Group"
        leftFunction={() => navigation.navigate("Discover")}
        rightFunction={() =>
          navigation.navigate("Create Group", {
            returnScreen: "My Groups",
          })
        }
      />
    </CScrollBackgroundRefresh>
  );
}

export default Groups;
