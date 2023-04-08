import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupsStackScreen from "../groups/GroupsStackScreen.js";
import HomeStackScreen from "../home/HomeStackScreen.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NotificationsStackScreen from "../notifications/NotificationsStackScreen.js";
import ProfileStackScreen from "../users/ProfileStackScreen.js";
import HomeIcon from "../../assets/noun-home-5222306-676767.svg";
import GroupsIcon from "../../assets/noun-group-1175010-676767.svg";
import NotificationsIcon from "../../assets/noun-notification-1439229-676767.svg";
import ProfileIcon from "../../assets/noun-profile-1307600-676767 (1).svg";
import {
  fetchNotificationsAsync,
  selectNotifications,
  addNotification,
} from "../notifications/notificationSlice.js";
import { createConsumer } from "@rails/actioncable";
import { selectUserId } from "../sessions/sessionSlice.js";
import { domain } from "@env";

const Tab = createBottomTabNavigator();

function TabNavigator() {
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

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return <HomeIcon width="25" height="25" fill="#20716A" />;
            } else if (route.name === "Groups") {
              return <GroupsIcon width="40" height="40" fill="#20716A" />;
            } else if (route.name === "NotificationsStackScreen") {
              return (
                <NotificationsIcon width="25" height="25" fill="#20716A" />
              );
            } else if (route.name === "ProfileStackScreen") {
              return <ProfileIcon width="25" height="25" fill="#20716A" />;
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
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="NotificationsStackScreen"
          component={NotificationsStackScreen}
          options={{
            title: "Notifications",
            headerShown: false,
            tabBarBadge: notifications.length,
          }}
        />
        <Tab.Screen
          name="ProfileStackScreen"
          component={ProfileStackScreen}
          options={{ title: "Profile", headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}

export default TabNavigator;
