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

function Groups({ navigation }) {
  const myGroups = useSelector(selectMyGroups);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  function requestToJoinGroup(groupId) {
    let inviteDetails = {
      group_id: groupId,
      internal_user_id: null,
      external_user_id: userId,
      request: true,
    };

    dispatch(createInviteAsync(inviteDetails));

    // if above succeeds ..?
    let notification_blueprint = {
      notificationable_type: "Group",
      notificationable_id: groupId,
      notification_type: 3,
    };

    createNotificationBlueprint(notification_blueprint);
  }

  // Called on initialise, because dispatch changes (on intialise)
  // and on myGroups.length change
  useEffect(() => {
    dispatch(fetchMyGroupsAsync());
  }, [dispatch, myGroups.length, isFocused]);

  // useFocusEffect(useCallback(() => () => dispatch(fetchMyGroupsAsync())));

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

        <Box position="absolute" bottom="0" width="100%">
          <HStack>
            <Button
              borderRadius="0"
              flex="1"
              variant="myButtonYellowVariant"
              onPress={() => navigation.navigate("Discover")}
            >
              Discover
            </Button>
            <Button
              borderLeftWidth="0"
              borderRadius="0"
              flex="1"
              variant="myButtonYellowVariant"
              onPress={() =>
                navigation.navigate("Create Group", {
                  returnScreen: "My Groups",
                })
              }
            >
              Create Group
            </Button>
          </HStack>
        </Box>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default Groups;
