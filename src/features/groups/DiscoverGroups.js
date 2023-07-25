import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOtherGroupsAsync, selectOtherGroups } from "./groupSlice";
import { selectNotice, setNotice } from "./invites/inviteSlice";
import {
  fetchInvitesAndRequestsPendingAsync,
  selectToBeActioned,
  setToBeConfirmed,
} from "./invites/inviteSlice";
import { VStack, Button, FormControl, Input } from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import CheckboxListing from "../layout/CheckboxListing";

function DiscoverGroups({ navigation }) {
  const otherGroups = useSelector(selectOtherGroups);
  const dispatch = useDispatch();
  const notice = useSelector(selectNotice);
  const [formData, setData] = useState({});
  const [groupList, setGroupList] = useState(otherGroups);
  const toBeActioned = useSelector(selectToBeActioned);

  // Called on initialise, because dispatch changes (on intialise)
  // and on myGroups.length change
  useEffect(() => {
    dispatch(setNotice("Look for Groups to join."));
    dispatch(fetchOtherGroupsAsync());
    dispatch(fetchInvitesAndRequestsPendingAsync());
  }, [dispatch, otherGroups.length]);

  useEffect(() => {
    setGroupList(filterGroups(otherGroups, formData.name));
  }, [formData.name, otherGroups.length]);

  function filterGroups(groups, name = null) {
    if (!name) {
      return [];
    }

    const searchValue = name.toLowerCase();

    const filteredGroups = groups.filter((group) => {
      const groupName = group.name.toLowerCase();
      return groupName.includes(searchValue);
    });

    const uniqueGroups = Array.from(
      new Map(filteredGroups.map((group) => [group.id, group])).values()
    );

    return uniqueGroups.slice(0, 10);
  }

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <VStack
          pl="4"
          pr="5"
          py="4"
          borderBottomWidth="1"
          borderColor="myBorderGray"
          width="100%"
        >
          <FormControl justifyContent="space-between">
            <VStack display="flex" w="100%">
              <FormControl.Label
                _text={{
                  bold: true,
                }}
              >
                Name of Group:
              </FormControl.Label>
              <Input
                placeholder="Your Workplace's Name"
                value={formData.name}
                onChangeText={(value) => {
                  setData({ ...formData, name: value });
                  dispatch(setNotice("Look for Groups to join."));
                }}
              />
              <FormControl.HelperText>{notice}</FormControl.HelperText>
            </VStack>
          </FormControl>
        </VStack>

        <CheckboxListing items={groupList} />

        <Button
          variant="myButtonYellowVariant"
          onPress={() => {
            dispatch(setToBeConfirmed(toBeActioned));
            navigation.navigate("Ask to Join");
          }}
          w="100%"
          borderRadius="0"
        >
          Ask to Join
        </Button>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default DiscoverGroups;
