import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupsStackScreen from "../groups/GroupsStackScreen.js";
import HomeStackScreen from "../home/HomeStackScreen.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Notifications from "../notifications/Notifications";
import Profile from "../users/Profile.js";
import HomeIcon from "../../assets/noun-home-5222306-676767.svg";
import GroupsIcon from "../../assets/noun-group-1175010-676767.svg";
import NotificationsIcon from "../../assets/noun-notification-1439229-676767.svg";
import ProfileIcon from "../../assets/noun-profile-1307600-676767 (1).svg";
import {
  fetchNotificationsAsync,
  selectNotifications,
  addNotification,
} from "../notifications/notificationSlice";
import { createConsumer } from "@rails/actioncable";
import { selectUserId, logoutUserAsync } from "../sessions/sessionSlice";
import { domain } from "@env";
import { Button } from "native-base";

const Tab = createBottomTabNavigator();

function LoggedInFlow() {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();
  const consumer = createConsumer(`ws://${domain}/cable`);
  const userId = useSelector(selectUserId);

  // For now, we will just sub to notification channel when in component
  const notificationsChannel = useMemo(() => {
    return consumer.subscriptions.create(
      {
        channel: "NotificationsChannel",
        user: userId,
      },
      {
        received(newNotification) {
          dispatch(addNotification(newNotification));
        },
      }
    );
  }, []);

  useEffect(() => {
    dispatch(fetchNotificationsAsync());
    return () => {
      notificationsChannel.unsubscribe();
    };
  }, []);

  function onLogout() {
    dispatch(logoutUserAsync());
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return <HomeIcon width="25" height="25" fill="#064e3b" />;
            } else if (route.name === "Groups") {
              return <GroupsIcon width="40" height="40" fill="#064e3b" />;
            } else if (route.name === "Notifications") {
              return (
                <NotificationsIcon width="25" height="25" fill="#064e3b" />
              );
            } else if (route.name === "Profile") {
              return <ProfileIcon width="25" height="25" fill="#064e3b" />;
            }
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupsStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{ tabBarBadge: notifications.length }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: "Edit Profile",
            headerRight: () => (
              <Button
                onPress={() => onLogout()}
                size="sm"
                mx="2"
                colorScheme="indigo"
              >
                Logout
              </Button>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default LoggedInFlow;
