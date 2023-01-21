import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import PostForm from "../posts/PostForm";
import DateTimePicker from "../posts/DateTimePicker";
import GroupSearch from "../groups/GroupSearch";
import ShiftForm from "../posts/shifts/ShiftForm";
import ReserveForm from "../posts/ReserveForm";
import BidForm from "../posts/bids/BidForm";
import BidConfirmation from "../posts/bids/BidConfirmation";
import PostScreen from "../posts/PostScreen.js";

const HomeStack = createNativeStackNavigator();

function GroupsStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home Feed"
        component={Home}
        options={({ route }) => ({
          title: "Shift Market",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#047857",
          headerTitleStyle: {
            fontSize: 28,
          },
        })}
      />
      <HomeStack.Screen name="Create Post" component={PostForm} />
      <HomeStack.Screen
        name="Time and Date"
        component={DateTimePicker}
        options={({ route }) => ({ title: route.params.mode })}
      />
      <HomeStack.Screen name="Your Groups" component={GroupSearch} />
      <HomeStack.Screen name="Add Shift" component={ShiftForm} />
      <HomeStack.Screen name="Add Reserve" component={ReserveForm} />
      <HomeStack.Screen name="Bid" component={BidForm} />
      <HomeStack.Screen name="Bid Confirmation" component={BidConfirmation} />
      <HomeStack.Screen name="Post" component={PostScreen} />
    </HomeStack.Navigator>
  );
}

export default GroupsStackScreen;
