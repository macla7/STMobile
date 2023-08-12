import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  loginUserWithTokenAsync,
} from "./../sessions/sessionSlice";
import { AppState, Alert, Linking } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../sessions/Login";
import Register from "../sessions/Register";
import ChangePassword from "../passwords/ChangePassword";
import Token from "../passwords/Token";
import TabNavigator from "./TabNavigator";
import EmailForm from "../passwords/EmailForm";
import { Center, Text } from "native-base";
import { fetchAppVersionAsync, selectAppVersion } from "./appVersionSlice";
import Constants from "expo-constants";

const Stack = createNativeStackNavigator();

function AuthStackScreen() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const appVersion = useSelector(selectAppVersion);
  const dispatch = useDispatch();

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") {
      dispatch(loginUserWithTokenAsync());
    }
  };

  useEffect(() => {
    // Add the AppState change listener
    AppState.addEventListener("change", handleAppStateChange);

    // Clean up the listener when the component unmounts
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, [dispatch]);

  useEffect(() => {
    // When the app is started or brought to the foreground
    dispatch(loginUserWithTokenAsync());
    dispatch(fetchAppVersionAsync());
  }, []);

  useEffect(() => {
    checkAppVersion();
  }, [appVersion]);

  function checkAppVersion() {
    const mobileVersion = Constants.expoConfig.version;
    // Compare the versions
    if (outOfDateVersion(appVersion, mobileVersion)) {
      // Show the alert to notify the user about the outdated app
      Alert.alert(
        //title
        "Update Required",
        //body
        "Your app is outdated. Please update to the latest version.",
        [
          { text: "Update", onPress: () => openAppStore() },
          {
            text: "No",
            onPress: () => console.log("No Pressed"),
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
  }

  function outOfDateVersion(appVersion, mobileVersion) {
    return (
      parseInt(appVersion.split(".").join("")) >
      parseInt(mobileVersion.split(".").join(""))
    );
  }

  const openAppStore = () => {
    // Replace these links with your app's actual links on the App Store and Google Play Store
    const appStoreLink = "https://apps.apple.com/au/app/shift-it/id6449267356";
    const androidStoreLink =
      "https://play.google.com/store/apps/details?id=com.macla7.shift_it";

    // Use the Linking API to open the app store link based on the device platform
    const storeLink = Platform.OS === "ios" ? appStoreLink : androidStoreLink;

    Linking.openURL(storeLink).catch((error) => {
      console.error("Error opening app store link:", error);
    });
  };

  return (
    <>
      {!isLoggedIn ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitle: (props) => (
              <Text fontSize="3xl" color="myLightGreen" fontWeight="500">
                Shift It.
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#3433E2",
              borderWidth: 10,
            },
            headerTintColor: "#fff",
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerTransparent: true,
            }}
          />
          <Stack.Screen name="Token" component={Token} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="EmailForm" component={EmailForm} />
        </Stack.Navigator>
      ) : (
        <TabNavigator />
      )}
    </>
  );
}

export default AuthStackScreen;
