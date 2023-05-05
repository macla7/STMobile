import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "./Groups";
import DiscoverGroups from "./DiscoverGroups";
import Group from "./Group";
import GroupInfo from "./GroupInfo";
import Search from "../users/Search";
import GroupForm from "./GroupForm";
import InfoIcon from "../../assets/noun-info-1126705-676767.svg";

const GroupsStack = createNativeStackNavigator();

function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#20716A",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {},
      }}
    >
      <GroupsStack.Screen name="My Groups" component={Groups} />
      <GroupsStack.Screen name="Discover" component={DiscoverGroups} />
      <GroupsStack.Screen
        name="Group"
        component={Group}
        options={({ route, navigation }) => ({
          title: route.params.group.name,
        })}
      />
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
