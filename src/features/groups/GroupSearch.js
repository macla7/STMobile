import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyGroupsAsync, selectMyGroups } from "./groupSlice";
import {
  Heading,
  VStack,
  Button,
  HStack,
  Text,
  Pressable,
  Box,
  FormControl,
  Input,
} from "native-base";
import { CBackground, CContentTile } from "../layout/LayoutComponents";
import GroupForm from "./GroupForm";

function GroupSearch({ navigation, route }) {
  const myGroups = useSelector(selectMyGroups);
  const dispatch = useDispatch();
  const { initGroupId } = route.params;
  const [groupId, setGroupId] = useState(initGroupId);
  const [groupName, setGroupName] = useState("");

  // Called on initialise, because dispatch changes (on intialise)
  // and on myGroups.length change
  useEffect(() => {
    dispatch(fetchMyGroupsAsync());
  }, [dispatch, myGroups.length]);

  useEffect(() => {
    if (myGroups.length == 0) {
      navigation.navigate("Groups", {
        screen: "Create Group",
        initial: false,
        params: {
          returnScreen: "Your Groups",
          initGroupId: initGroupId,
        },
      });
    }
  }, [dispatch, myGroups.length]);

  return (
    <>
      <CBackground>
        <CContentTile>
          <Heading fontSize="xl" pt="4" pb="3">
            Pick Group
          </Heading>
          {myGroups.length == 0 ? (
            <Text>
              You need to join or create a group to make posts in. Posts can
              only be made within a group.
            </Text>
          ) : (
            myGroups.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  setGroupName(item.name);
                  setGroupId(item.id);
                }}
              >
                <Box
                  borderBottomWidth="1"
                  borderColor="myBorderGray"
                  backgroundColor={groupId == item.id ? "primary.100" : null}
                  borderWidth={groupId == item.id ? "1" : null}
                  pl="4"
                  pr="5"
                  py="2"
                  borderRadius="4"
                >
                  <HStack space={3} justifyContent="space-between">
                    <VStack w="100%">
                      <Text color="myDarkGrayText" bold>
                        {item.name}
                      </Text>
                      <Text color="myMidGrayText">
                        {item.number_of_memberships} members
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Pressable>
            ))
          )}
        </CContentTile>
      </CBackground>
      <HStack>
        <Button
          variant="myButtonYellowVariant"
          onPress={() => {
            // Pass and merge params back to home screen
            navigation.navigate({
              name: "Create Post",
              params: {
                groupId: groupId ? groupId : 0,
                groupName: groupName ? groupName : "Group Not Selected..",
              },
              merge: true,
            });
          }}
          borderRadius="9"
          margin="2"
          flex="1"
        >
          Done
        </Button>
      </HStack>
    </>
  );
}

export default GroupSearch;
