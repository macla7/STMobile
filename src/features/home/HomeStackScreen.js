import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import BidForm from "../posts/bids/BidForm";
import BidConfirmation from "../posts/bids/BidConfirmation";
import PostScreen from "../posts/PostScreen.js";
import { Text } from "native-base";

const HomeStack = createNativeStackNavigator();

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator
      screenOptions={({}) => ({
        headerStyle: {
          backgroundColor: "#3433E2",
        },
        headerTintColor: "#CDFF00",
      })}
      initialRouteName="Home Feed"
    >
      <HomeStack.Screen
        name="Home Feed"
        component={Home}
        options={({ route }) => ({
          headerTitle: (props) => (
            <Text fontSize="3xl" color="myLightGreen" fontWeight="500">
              Shift it.
            </Text>
          ),
        })}
      />
      <HomeStack.Screen name="Bid" component={BidForm} />
      <HomeStack.Screen name="Bid Confirmation" component={BidConfirmation} />
      <HomeStack.Screen
        name="Post"
        component={PostScreen}
        options={{
          headerTransparent: true,
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
