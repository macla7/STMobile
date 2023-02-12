import React from "react";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../sessions/Login";
import Register from "../sessions/Register";
import ChangePassword from "../passwords/ChangePassword";
import Token from "../passwords/Token";
import LoggedInFlow from "./LoggedInFlow";
import EmailForm from "../passwords/EmailForm";
const Stack = createNativeStackNavigator();

function AuthFlow() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Token" component={Token} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="EmailForm" component={EmailForm} />
          </Stack.Navigator>
        </>
      ) : (
        <LoggedInFlow />
      )}
    </>
  );
}

export default AuthFlow;
