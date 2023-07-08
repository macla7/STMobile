import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Groups from "./Groups";
import DiscoverGroups from "./DiscoverGroups";
import Group from "./Group";
import GroupInfo from "./GroupInfo";
import Search from "../users/Search";
import GroupForm from "./GroupForm";
import ConfirmInvites from "../users/ConfirmInvites";
import ConfirmAsking from "./ConfirmAsking";
import MemberDetails from "../users/MemberDetails";

const GroupsStack = createNativeStackNavigator();

function GroupsStackScreen() {
  return (
    <GroupsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#3433E2",
        },
        headerTintColor: "#CDFF00",
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
      <GroupsStack.Screen
        name="Confirm Invites"
        component={ConfirmInvites}
        options={{
          presentation: "modal",
        }}
      />
      <GroupsStack.Screen
        name="Ask to Join"
        component={ConfirmAsking}
        options={{
          presentation: "modal",
        }}
      />
      <GroupsStack.Screen
        name="Create Group"
        component={GroupForm}
        options={({ route }) => ({
          headerTransparent: true,
        })}
      />
      <GroupsStack.Screen
        name="Member Details"
        component={MemberDetails}
        options={({ route }) => ({
          headerTransparent: true,
        })}
      />
    </GroupsStack.Navigator>
  );
}

export default GroupsStackScreen;
