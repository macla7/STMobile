import React, { useMemo, useEffect, useRef } from "react";
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
import { AddIcon } from "native-base";
import CreatePostStackScreen from "../posts/CreatePostStackScreen.js";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import * as Random from "expo-random";
import {
  createPushTokenAsync,
  fetchPushTokensAsync,
  selectPushTokens,
  updatePushTokenAsync,
  setCurrentPushToken,
} from "../users/pushTokenSlice";
import { isToday, parseISO } from "date-fns";

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function TabNavigator() {
  const notifications = useSelector(selectNotifications);
  const dispatch = useDispatch();
  const consumer = createConsumer(`ws://${domain}/cable`);
  const userId = useSelector(selectUserId);
  const notificationListener = useRef();
  const pushTokens = useSelector(selectPushTokens);

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

  useEffect(() => {
    dispatch(fetchPushTokensAsync(userId));
  }, []);

  useEffect(() => {
    if (setCurrentPushToken.id == 0) {
      generateUniqueId().then((deviceId) =>
        checkDevice(userId, pushTokens, deviceId)
      );

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      };
    }
  }, [JSON.stringify(pushTokens[0])]);

  function checkDevice(userId, pushTokens, deviceId) {
    if (Device.checkDevice) {
      registerForPushNotificationsAsync(userId, pushTokens, deviceId);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }

  async function registerForPushNotificationsAsync(
    userId,
    pushTokens,
    deviceId
  ) {
    let token = await getPermissionForPushAsync();

    let pushTokenObjNow = getPushTokenObjNow(token, userId, deviceId);
    const pushTokenInDB = returnDevicePushTokenDB(deviceId, pushTokens);

    savePushToken(pushTokenObjNow, pushTokenInDB);
  }

  async function getPermissionForPushAsync() {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    return (await Notifications.getExpoPushTokenAsync()).data;
  }

  const getPushTokenObjNow = (token, userId, deviceId) => {
    return { push_token: token, user_id: userId, device_id: deviceId };
  };

  // looks at array and returns a pushToken object if device's match
  const returnDevicePushTokenDB = (deviceId, pushTokens) =>
    pushTokens.find((obj) => obj.device_id === deviceId) || false;

  const savePushToken = (pushTokenObjNow, pushTokenInDB) => {
    if (pushTokenInDB) {
      updatePushToken(pushTokenObjNow, pushTokenInDB);
    } else {
      console.log("Need to create a new push Token in DB");
      dispatch(createPushTokenAsync(pushTokenObjNow));
    }
  };

  const updatePushToken = (pushTokenObjNow, pushTokenInDB) => {
    if (isPushTokenSame(pushTokenInDB, pushTokenObjNow)) {
      pushTokenObjNow.id = pushTokenInDB.id;
      if (isPushTokenRefreshed(pushTokenInDB)) {
        dispatch(setCurrentPushToken(pushTokenObjNow));
        console.log("Push token is already refreshed and updated today");
      } else {
        dispatch(updatePushTokenAsync(pushTokenObjNow));
        console.log("push token is now being refreshed for today");
      }
    } else {
      pushTokenObjNow.id = pushTokenInDB.id;
      dispatch(updatePushTokenAsync(pushTokenObjNow));
      console.log("push token in DB object needs to be updated");
    }
  };

  const isPushTokenSame = (pushTokenInDB, pushTokenObjNow) =>
    pushTokenInDB.push_token == pushTokenObjNow.push_token ? true : false;

  const isPushTokenRefreshed = (pushTokenInDB) =>
    isToday(parseISO(pushTokenInDB.updated_at));

  const generateUniqueId = async () => {
    let deviceId = await AsyncStorage.getItem("deviceId");

    if (!deviceId) {
      const randomBytes = await Random.getRandomBytesAsync(16);
      deviceId =
        Application.applicationName +
        "-" +
        Array.from(randomBytes)
          .map((byte) => byte.toString(16))
          .join("");
      await AsyncStorage.setItem("deviceId", deviceId);
    }

    return deviceId;
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return <HomeIcon width="25" height="25" fill="#20716A" />;
            } else if (route.name === "Groups") {
              return <GroupsIcon width="40" height="40" fill="#20716A" />;
            } else if (route.name === "Create") {
              return <AddIcon size="xl" color="#20716A" />;
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
          name="Create"
          component={CreatePostStackScreen}
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
