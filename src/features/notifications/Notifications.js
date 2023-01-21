import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNotifications,
  updateNotificationAsync,
} from "./notificationSlice";
import { selectUserId } from "../sessions/sessionSlice";
import { Box, VStack, Button, Flex, Text, FlatList } from "native-base";
import { createMembershipAsync } from "../groups/memberships/membershipSlice";
import { updateInviteAsync } from "../groups/invites/inviteSlice";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import { formatDistanceToNow } from "date-fns";

function Notifications({ navigation }) {
  const notifications = useSelector(selectNotifications);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <Box>
          <FlatList
            data={notifications}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "gray.600",
                }}
                borderColor="coolGray.200"
                px="2"
                py="2"
              >
                <Flex
                  flexDirection="row"
                  justifyContent="space-between"
                  w="100%"
                >
                  <VStack width="50%">
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.description}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {formatDistanceToNow(new Date(item.created_at))} ago
                    </Text>
                  </VStack>
                  <Button
                    colorScheme="indigo"
                    mt="2"
                    ml="2"
                    onPress={() => {
                      startAction(item);
                    }}
                    h="10"
                    flexGrow={1}
                    width="30"
                    p="1"
                  >
                    {handleActionButtonText(item)}
                  </Button>
                  <Button
                    colorScheme="indigo"
                    mt="2"
                    ml="2"
                    onPress={() => {
                      actionNotification(item, false);
                    }}
                    h="10"
                    flexGrow={1}
                    width="15"
                    p="1"
                  >
                    Dismiss
                  </Button>
                </Flex>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
      </CWholeSpaceContentTile>
    </CBackground>
  );

  function handleActionButtonText(notification) {
    switch (notification.notification_blueprint.notificationable_type) {
      case "Post":
        return "View Post";
      case "Invite":
        return "Accept";
    }
  }

  function startAction(notification) {
    if (notification.notification_blueprint.notification_type === 1) {
      handleAcceptInvite(notification);
    } else if (notification.notification_blueprint.notification_type === 3) {
      handleAcceptRequest(notification);
    } else {
      navigation.navigate("Post", {
        returnScreen: "Notifications",
        postId: notification.notification_blueprint.notificationable_id,
      });
    }
  }

  function handleAcceptInvite(notification) {
    // create membership
    let membershipDetails = {
      group_id: notification.group_id,
      user_id: userId,
      role: 1,
      status: 0,
    };
    dispatch(createMembershipAsync(membershipDetails));
    // update invite
    let invite = {
      inviteDetails: {
        accepted: true,
      },
      id: notification.notification_blueprint.notificationable_id,
      group_id: notification.group_id,
    };
    dispatch(updateInviteAsync(invite));

    actionNotification(notification, true);
  }

  function handleAcceptRequest(notification) {
    // create membership
    let membershipDetails = {
      group_id: notification.group_id,
      user_id: notification.notification_origin.notifier_id,
      role: 1,
      status: 0,
    };
    dispatch(createMembershipAsync(membershipDetails));

    // update invite
    let invite = {
      inviteDetails: {
        accepted: true,
      },
      id: notification.notification_blueprint.notificationable_id,
      group_id: notification.group_id,
    };
    dispatch(updateInviteAsync(invite));

    actionNotification(notification, true);
  }

  function actionNotification(notification, bool) {
    let notificationDetails = {
      id: notification.id,
      actioned: bool,
    };
    dispatch(updateNotificationAsync(notificationDetails));
  }
}

export default Notifications;
