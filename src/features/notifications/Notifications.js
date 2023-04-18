import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNotifications,
  updateNotificationAsync,
} from "./notificationSlice";
import { selectUserId } from "../sessions/sessionSlice";
import { Box, Text, Button, FlatList, Flex } from "native-base";
import { createMembershipAsync } from "../groups/memberships/membershipSlice";
import { updateInviteAsync } from "../groups/invites/inviteSlice";
import { CBackground } from "../layout/LayoutComponents";
import { formatDistanceToNow } from "date-fns";
import DP from "../layout/DP";

function Notifications({ navigation }) {
  const notifications = useSelector(selectNotifications);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  return (
    <CBackground>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <Flex
            borderBottomWidth="1"
            borderColor="myBorderGray"
            p="2"
            direction="row"
            flex="1"
          >
            <Box>
              <Box>
                <DP uri={`${item.notifier_avatar_url}`} size={65} />
              </Box>
            </Box>
            <Box ml="2" overflow="hidden" flex="1">
              <Flex h="65" justifyContent="center">
                <Text color="myDarkGrayText" bold numberOfLines={2}>
                  {item.description}
                </Text>
                <Text color="myMidGrayText">
                  {formatDistanceToNow(new Date(item.created_at))} ago
                </Text>
              </Flex>
              <Flex direction="row">
                <Button
                  variant="myButtonYellowVariant"
                  onPress={() => {
                    startAction(item);
                  }}
                  h="8"
                  p="1"
                  mr="1"
                  w="45%"
                >
                  {handleActionButtonText(item)}
                </Button>
                <Button
                  variant="myButtonGrayVariant"
                  onPress={() => {
                    actionNotification(item, false);
                  }}
                  h="8"
                  p="1"
                  ml="1"
                  w="45%"
                >
                  Delete
                </Button>
              </Flex>
            </Box>
          </Flex>
          // <HStack
          //   bgColor="red.200"
          // borderBottomWidth="1"
          // borderColor="myBorderGray"
          // p="2"
          //   position="relative"
          //   w="100%"
          // >
          // <Box pt="2" pl="2" bgColor="blue.200">
          //   <DP uri={`${item.notifier_avatar_url}`} />
          // </Box>
          //   <Flex borderWidth="1">
          // <Text color="myDarkGrayText" bold>
          //   and then some more {item.description}
          // </Text>

          // <Text color="myMidGrayText">
          //   {formatDistanceToNow(new Date(item.created_at))} ago
          // </Text>
          // <HStack>
          //   <Button
          //     variant="myButtonYellowVariant"
          //     mt="2"
          //     onPress={() => {
          //       startAction(item);
          //     }}
          //     h="10"
          //     flexGrow={1}
          //     p="1"
          //   >
          //     {handleActionButtonText(item)}
          //   </Button>
          //   <Button
          //     variant="myButtonGrayVariant"
          //     mt="2"
          //     ml="2"
          //     onPress={() => {
          //       actionNotification(item, false);
          //     }}
          //     h="10"
          //     flexGrow={1}
          //     p="1"
          //   >
          //     Delete
          //   </Button>
          // </HStack>
          //   </Flex>
          // </HStack>
        )}
        keyExtractor={(item) => item.id}
      />
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
      navigation.navigate("Home", {
        screen: "Post",
        initial: false,
        params: {
          returnScreen: "Home Feed",
          postId: notification.notification_blueprint.notificationable_id,
        },
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
