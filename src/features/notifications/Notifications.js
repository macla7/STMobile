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
import { CScrollBackgroundRefresh } from "../layout/LayoutComponents";
import { formatDistanceToNow } from "date-fns";
import DP from "../layout/DP";
import { fetchNotificationsAsync } from "./notificationSlice";

function Notifications({ navigation }) {
  const notifications = useSelector(selectNotifications);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

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
    let membershipObj = createMembershipObj(notification, userId);
    dispatch(createMembershipAsync(membershipObj));

    let invite = createInviteObj(notification, true);
    dispatch(updateInviteAsync(invite));

    actionNotification(notification, true);
  }

  function handleAcceptRequest(notification) {
    let membershipObj = createMembershipObj(
      notification,
      notification.notification_origin.notifier_id
    );
    dispatch(createMembershipAsync(membershipObj));

    let invite = createInviteObj(notification, true);
    dispatch(updateInviteAsync(invite));

    actionNotification(notification, true);
  }

  function createMembershipObj(notification, userId) {
    return {
      group_id: notification.group_id,
      user_id: userId,
      role: 1,
      status: 0,
    };
  }

  function createInviteObj(notification, bool) {
    return {
      inviteDetails: {
        accepted: bool,
      },
      id: notification.notification_blueprint.notificationable_id,
      group_id: notification.group_id,
    };
  }

  function handleDecline(notification) {
    let invite = createInviteObj(notification, false);
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

  function refresh() {
    dispatch(fetchNotificationsAsync());
  }

  return (
    <CScrollBackgroundRefresh refreshAction={refresh}>
      {notifications.map((item) => {
        return (
          <Flex
            borderBottomWidth="1"
            borderColor="myBorderGray"
            p="2"
            direction="row"
            flex="1"
            key={item.id}
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
                    handleDecline(item);
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
        );
      })}
    </CScrollBackgroundRefresh>
  );
}

export default Notifications;
