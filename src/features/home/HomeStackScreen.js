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
import { Button, HStack, Text } from "native-base";

const HomeStack = createNativeStackNavigator();

function GroupsStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={({}) => ({
        headerStyle: {
          backgroundColor: "#20716A",
        },
        headerTintColor: "#ffffff",
      })}
      initialRouteName="Home Feed"
    >
      <HomeStack.Screen
        name="Home Feed"
        component={Home}
        options={({ route }) => ({
          headerTitle: (props) => (
            <HStack flex="1">
              <Text fontSize="3xl" color="white" fontWeight="500">
                Shift Market
              </Text>
            </HStack>
          ),
          headerRight: () => (
            <Button
              onPress={() =>
                navigation.navigate("Create Post", {
                  date: Date.now(),
                  groupId: 0,
                  groupName: "Group Not Selected..",
                  description: "",
                  reserve: 0,
                  returnScreen: "Home Feed",
                })
              }
              size="sm"
              variant="myButtonYellowVariant"
            >
              Create Post
            </Button>
          ),
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
