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
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack
                space={3}
                justifyContent="space-between"
                onTouchEnd={() =>
                  navigation.navigate("Group", {
                    item: item,
                  })
                }
              >
                <VStack w="100%">
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.number_of_memberships} members
                  </Text>
                </VStack>
              </HStack>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />

        <Box p="2" position="absolute" bottom="0" width="100%">
          <HStack>
            <Button
              mx="4"
              flex="1"
              colorScheme="indigo"
              onPress={() => navigation.navigate("Discover")}
            >
              Discover
            </Button>
            <Button
              mx="4"
              flex="1"
              colorScheme="indigo"
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
