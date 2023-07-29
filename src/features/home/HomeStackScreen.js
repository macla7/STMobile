import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import BidForm from "../posts/bids/BidForm";
import BidConfirmation from "../posts/bids/BidConfirmation";
import PostScreen from "../posts/PostScreen.js";
import PostSettings from "../posts/PostSettings";
import ConfirmDeletePost from "../posts/ConfirmDeletePost";
import Info from "./Info";
import { Text, Pressable, InfoOutlineIcon, Center } from "native-base";
import ConfirmBids from "../groups/ConfirmBids";

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
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Info")}>
              <InfoOutlineIcon color="#CDFF00" size="6" />
            </Pressable>
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
      <HomeStack.Screen
        name="Post Settings"
        component={PostSettings}
        options={{
          presentation: "modal",
        }}
      />
      <HomeStack.Screen
        name="Confirm Delete Post"
        component={ConfirmDeletePost}
        options={{
          presentation: "modal",
        }}
      />
      <HomeStack.Screen
        name="Info"
        component={Info}
        options={{
          presentation: "modal",
        }}
      />
      <HomeStack.Screen
        name="Confirm Bids"
        component={ConfirmBids}
        options={{
          presentation: "modal",
        }}
      />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
