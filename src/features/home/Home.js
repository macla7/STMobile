import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../posts/Posts";
import { selectHomePosts, fetchPostsHomeAsync } from "../posts/postSlice";
import { CScrollBackgroundRefresh } from "../layout/LayoutComponents";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { selectUserId } from "../sessions/sessionSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import * as Random from "expo-random";
import {
  createPushTokenAsync,
  fetchPushTokensAsync,
  selectPushTokens,
  updatePushTokenAsync,
} from "../users/pushTokenSlice";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Home({ navigation }) {
  const homePosts = useSelector(selectHomePosts);
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const pushTokens = useSelector(selectPushTokens);

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

  async function registerForPushNotificationsAsync(
    userId,
    pushTokens,
    deviceId
  ) {
    let token;
    if (Device.isDevice) {
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
      token = (await Notifications.getExpoPushTokenAsync()).data;

      let pushTokenObjNow = {
        push_token: token,
        device_id: deviceId,
        user_id: userId,
      };

      const pushTokenDB = returnKnownDevicePTObj(deviceId, pushTokens);

      if (pushTokenDB) {
        if (isPushTokenSame(pushTokenDB, pushTokenObjNow)) {
          // perhaps sending an update request with updated updated_at params
          // so that we can clean based off updated_at getting too stale.
          console.log("push token is the same as DB Object");
        } else {
          console.log("push token in DB object needs to be updated");
          dispatch(updatePushTokenAsync(pushTokenObjNow));
        }
      } else {
        console.log("Need to create a new push Token in DB");
        dispatch(createPushTokenAsync(pushTokenObjNow));
      }
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

  // looks at array and returns a pushToken object if device's match
  const returnKnownDevicePTObj = (deviceId, pushTokens) =>
    pushTokens.find((obj) => obj.device_id === deviceId) || false;

  const isPushTokenSame = (pushTokenDB, pushTokenNow) =>
    pushTokenDB.push_token == pushTokenNow.push_token ? true : false;

  useEffect(() => {
    dispatch(fetchPushTokensAsync(userId));
  }, []);

  useEffect(() => {
    if (pushTokens.length == 0 || pushTokens[0].id != 0) {
      generateUniqueId().then((deviceId) =>
        registerForPushNotificationsAsync(userId, pushTokens, deviceId)
      );

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log(response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [JSON.stringify(pushTokens[0])]);

  useEffect(() => {
    dispatch(fetchPostsHomeAsync());
  }, [homePosts.length]);

  function refresh() {
    dispatch(fetchPostsHomeAsync());
  }

  return (
    <CScrollBackgroundRefresh refreshAction={() => refresh()}>
      <Posts navigation={navigation} posts={homePosts} />
    </CScrollBackgroundRefresh>
  );
}

export default Home;
