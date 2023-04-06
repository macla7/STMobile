import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "./Groups";
import DiscoverGroups from "./DiscoverGroups";
import PostForm from "../posts/PostForm";
import DateTimePicker from "../posts/DateTimePicker";
import ReserveForm from "../posts/ReserveForm";
import GroupSearch from "../groups/GroupSearch";
import ShiftForm from "../posts/shifts/ShiftForm";
import Group from "./Group";
import GroupInfo from "./GroupInfo";
import Search from "../users/Search";
import GroupForm from "./GroupForm";
import { Button, AspectRatio } from "native-base";
import InfoIcon from "../../assets/noun-info-1126705-676767.svg";

const GroupsStack = createNativeStackNavigator();

function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator>
      <GroupsStack.Screen name="My Groups" component={Groups} />
      <GroupsStack.Screen name="Discover" component={DiscoverGroups} />
      <GroupsStack.Screen
        name="Group"
        component={Group}
        options={({ route, navigation }) => ({
          title: route.params.group.name,
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
              variant="outline"
              _text={{
                color: "myDarkGreen",
                borderColor: "myDarkGreen",
              }}
            >
              Create Post
            </Button>
          ),
        })}
      />
      <GroupsStack.Screen name="Create Post" component={PostForm} />
      <GroupsStack.Screen
        name="Time and Date"
        component={DateTimePicker}
        options={({ route }) => ({ title: route.params.mode })}
      />
      <GroupsStack.Screen name="Add Reserve" component={ReserveForm} />
      <GroupsStack.Screen name="Your Groups" component={GroupSearch} />
      <GroupsStack.Screen name="Add Shift" component={ShiftForm} />
      <GroupsStack.Screen
        name="GroupInfo"
        component={GroupInfo}
        options={({ route }) => ({
          title: `${route.params.group.name} Details`,
        })}
      />
      <GroupsStack.Screen
        name="Invite"
        component={Search}
        options={({ route }) => ({
          title: "Invite People",
        })}
      />
      <GroupsStack.Screen name="Create Group" component={GroupForm} />
    </GroupsStack.Navigator>
  );
}

export default GroupsStackScreen;
