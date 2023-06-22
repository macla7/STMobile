import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, selectUsers } from "./userSlice";
import {
  selectNotice,
  setNotice,
  setToBeConfirmed,
} from "../groups/invites/inviteSlice";
import { VStack, FormControl, Input, Button } from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import CheckboxListing from "../layout/CheckboxListing";

function Search({ route, navigation }) {
  const users = useSelector(selectUsers);
  const [userList, setUserList] = useState(useSelector(selectUsers));
  const dispatch = useDispatch();
  const notice = useSelector(selectNotice);
  const { group } = route.params;
  const [formData, setData] = useState({});

  useEffect(() => {
    dispatch(setNotice("Look for coworkers to invite to your group."));
    dispatch(fetchUsersAsync(group.id));
    setUserList(filterItems(users, formData.name));
  }, [dispatch, users.length]);

  useEffect(() => {
    setUserList(filterItems(users, formData.name));
  }, [dispatch, users.length, formData.name]);

  function filterItems(items, rawSearchValue = null) {
    if (!rawSearchValue) {
      return [];
    }

    const searchValue = rawSearchValue.toLowerCase();

    const filteredItems = filterItemsWithSearch(items, searchValue);

    const uniqueItems = Array.from(
      new Map(filteredItems.map((item) => [item.id, item])).values()
    );

    return uniqueItems.slice(0, 10);
  }

  function filterItemsWithSearch(items, searchValue) {
    return items.filter((user) => {
      const userName = user.name.toLowerCase();
      const userEmail = user.email.toLowerCase();
      return userName.includes(searchValue) || userEmail.includes(searchValue);
    });
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
                Email or Name:
              </FormControl.Label>
              <Input
                placeholder="coworker@example.com"
                value={formData.name}
                onChangeText={(value) => {
                  setData({ ...formData, name: value });
                  dispatch(
                    setNotice("Look for coworkers to invite to your group.")
                  );
                }}
              />
              <FormControl.HelperText>{notice}</FormControl.HelperText>
            </VStack>
          </FormControl>
        </VStack>

        <CheckboxListing
          items={userList}
          confirming={false}
          setState={setToBeConfirmed}
        />

        <Button
          variant="myButtonYellowVariant"
          onPress={() => {
            navigation.navigate("Confirm Invites", {
              group: group,
            });
          }}
          w="100%"
          borderRadius="0"
        >
          Confirm Invites
        </Button>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default Search;
