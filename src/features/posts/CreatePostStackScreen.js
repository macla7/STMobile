import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostForm from "./PostForm";
import DateTimePicker from "./DateTimePicker";
import GroupSearch from "../groups/GroupSearch";
import ShiftForm from "./shifts/ShiftForm";
import ReserveForm from "./ReserveForm";

const CreatePostStack = createNativeStackNavigator();

function CreatePostStackScreen({ navigation }) {
  return (
    <CreatePostStack.Navigator
      screenOptions={({}) => ({
        headerStyle: {
          backgroundColor: "#4243ed",
        },
        headerTintColor: "#fff",
      })}
      initialRouteName="Create Post"
    >
      <CreatePostStack.Screen
        name="Create Post"
        component={PostForm}
        initialParams={{
          postEndsDate: Date.now(),
          groupId: 0,
          groupName: "Select Group",
          description: "",
          reserve: 0,
        }}
        options={{
          headerTransparent: true,
        }}
      />
      <CreatePostStack.Screen
        name="Time and Date"
        component={DateTimePicker}
        options={({ route }) => ({
          title: route.params.mode,
        })}
      />
      <CreatePostStack.Screen name="Your Groups" component={GroupSearch} />
      <CreatePostStack.Screen
        name="Add Shift"
        component={ShiftForm}
        options={{
          headerTransparent: true,
        }}
      />
      <CreatePostStack.Screen name="Add Reserve" component={ReserveForm} />
    </CreatePostStack.Navigator>
  );
}

export default CreatePostStackScreen;
