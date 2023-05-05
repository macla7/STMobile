import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostForm from "./PostForm";
import DateTimePicker from "./DateTimePicker";
import GroupSearch from "../groups/GroupSearch";
import ShiftForm from "./shifts/ShiftForm";
import ReserveForm from "./ReserveForm";

const HomeStack = createNativeStackNavigator();

function CreatePostStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={({}) => ({
        headerStyle: {
          backgroundColor: "#20716A",
        },
        headerTintColor: "#ffffff",
      })}
      initialRouteName="Create Post"
    >
      <HomeStack.Screen
        name="Create Post"
        component={PostForm}
        initialParams={{
          date: Date.now(),
          groupId: 0,
          groupName: "Group Not Selected..",
          description: "",
          reserve: 0,
        }}
      />
      <HomeStack.Screen
        name="Time and Date"
        component={DateTimePicker}
        options={({ route }) => ({ title: route.params.mode })}
      />
      <HomeStack.Screen name="Your Groups" component={GroupSearch} />
      <HomeStack.Screen name="Add Shift" component={ShiftForm} />
      <HomeStack.Screen name="Add Reserve" component={ReserveForm} />
    </HomeStack.Navigator>
  );
}

export default CreatePostStackScreen;
