import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGroupsAsync, selectMyGroups } from "./groupSlice";
import { selectUserId } from "../sessions/sessionSlice";
import { createInviteAsync } from "./invites/inviteSlice";
import { createNotificationBlueprint } from "../notifications/notificationBlueprintAPI";
import { Box, VStack, Button, HStack, Text, FlatList } from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
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

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <FlatList
          data={myGroups}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              borderColor="myBorderGray"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack
                space={3}
                justifyContent="space-between"
                onTouchEnd={() =>
                  navigation.navigate("Group", {
                    group: item,
                  })
                }
              >
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
          )}
          keyExtractor={(item) => item.id}
        />

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
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default Groups;
