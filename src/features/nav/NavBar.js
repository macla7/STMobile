import React from "react";
import SessionManager from "../sessions/SessionManager";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useSelector } from "react-redux";
import Logout from "../sessions/Logout.js";
import { View, Button } from "react-native";

function NavBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <View>
      <View>
        {/* <Link to="/home">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/groups">Groups</Link> */}
      </View>
      {isLoggedIn ? <Logout /> : <SessionManager />}
    </View>
  );
}

export default NavBar;
