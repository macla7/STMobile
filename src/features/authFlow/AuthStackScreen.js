import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  loginUserWithTokenAsync,
} from "../sessions/sessionSlice";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../sessions/Login";
import Register from "../sessions/Register";
import ChangePassword from "../passwords/ChangePassword";
import Token from "../passwords/Token";
import TabNavigator from "./TabNavigator";
import EmailForm from "../passwords/EmailForm";
import { Center, Text } from "native-base";

const Stack = createNativeStackNavigator();

function AuthStackScreen() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    dispatch(loginUserWithTokenAsync());
  }, []);

  return (
    <>
      {!isLoggedIn ? (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitle: (props) => (
              <Text fontSize="3xl" color="myLightGreen" fontWeight="500">
                Shift it.
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
