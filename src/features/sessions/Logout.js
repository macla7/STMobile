import React from "react";
import { useDispatch } from "react-redux";
import { logoutUserAsync } from "./sessionSlice";
import { View, Button } from "react-native";

function SessionManager() {
  const dispatch = useDispatch();

  function logout() {
    dispatch(logoutUserAsync());
  }

  return (
    <View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}

export default SessionManager;
