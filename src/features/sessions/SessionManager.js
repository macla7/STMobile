import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "./sessionSlice";
import { selectAuthToken, selectUserEmail, selectUserId } from "./sessionSlice";
import Register from "./Register";
import Login from "./Login";
import { View, Text } from "react-native";

function SessionManager() {
  const authToken = useSelector(selectAuthToken);
  const userEmail = useSelector(selectUserEmail);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUserAsync());
  }

  return (
    <View>
      <View>
        <Text>{authToken ? "got token" : "no token"}</Text>
        <Text>{userEmail}</Text>
        <Text>{userId}</Text>
        {/* <img src={userAvatarUrl} alt="avatar" /> */}
      </View>
      <Text>Register</Text>
      <Register />
      <Text>Login</Text>
      <Login />
    </View>
  );
}

export default SessionManager;
