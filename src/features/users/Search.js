import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, selectUsers } from "./userSlice";
import {
  createInviteAsync,
  selectFreshInvite,
} from "../groups/invites/inviteSlice";
import { createNotificationBlueprint } from "../notifications/notificationBlueprintAPI";
import {
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  Pressable,
  FlatList,
  Box,
  AddIcon,
  Center,
  CheckCircleIcon,
  Checkbox,
} from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import DP from "../layout/DP";
import KeyboardWrapper from "../layout/KeyboardWrapper";

// Definitely coupled a bit too much with invite and group logic I think
function Search({ route }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const users = useSelector(selectUsers);
  const freshInvite = useSelector(selectFreshInvite);
  const [userList, setUserList] = useState(useSelector(selectUsers));
  const dispatch = useDispatch();
  const [inviteNotice, setInviteNotice] = useState("");
  const { group } = route.params;
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [toBeInvited, setToBeInvited] = useState([]);

  // Members
  useEffect(() => {
    dispatch(fetchUsersAsync(group.id));
  }, [dispatch]);

  useEffect(() => {
    setUserList(filterUsers(users, formData.name));
  }, [formData.name, users.length]);

  function adjustInvitationList(user) {
    if (checkUserInvitation(user)) {
      removeUserFromToBeInvited(user);
    } else {
      addUserToBeInvited(user);
    }
  }

  function addUserToBeInvited(user) {
    setToBeInvited((prevArray) => [...prevArray, user.id]);
  }

  function removeUserFromToBeInvited(user) {
    setToBeInvited(toBeInvited.filter((num) => num !== user.id));
  }

  function checkUserInvitation(user) {
    return toBeInvited.includes(user.id);
  }

  function filterUsers(users, name = null, email = null) {
    if (!name && !email) {
      return users;
    }

    const searchValue = (name || email).toLowerCase();

    const filteredUsers = users.filter((user) => {
      const userName = user.name.toLowerCase();
      const userEmail = user.email.toLowerCase();
      return userName.includes(searchValue) || userEmail.includes(searchValue);
    });

    const uniqueUsers = Array.from(
      new Map(filteredUsers.map((user) => [user.id, user])).values()
    );

    return uniqueUsers;
  }

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  const validate = () => {
    if (formData.name === undefined || formData.name === "") {
      setErrors({ ...errors, name: "Email is required" });
      return false;
    } else if (!validateEmail(formData.name)) {
      setErrors({ ...errors, name: "Can't find User by that email" });
      return false;
    }
    inviteUser(findUserByEmail(formData.name)[0]);
    return true;
  };

  function validateEmail(email) {
    return findUserByEmail(email).length === 1;
  }

  function findUserByEmail(email) {
    return users.filter((user) => user.email === email);
  }

  function inviteUser(user) {
    let inviteDetails = {
      group_id: group.id,
      internal_user_id: userId,
      external_user_id: user.id,
      request: false,
    };
    setInviteNotice(`Invited ${user.email}!`);
    dispatch(createInviteAsync(inviteDetails));
    dispatch(fetchUsersAsync(group.id));
  }

  useEffect(() => {
    if (freshInvite.id != 0) {
      let notification_blueprint = {
        notificationable_type: "Invite",
        notificationable_id: freshInvite.id,
        notification_type: 1,
        recipient_id: freshInvite.external_user_id,
      };

      createNotificationBlueprint(notification_blueprint);
    }
  }, [freshInvite.id]);

  return (
    <KeyboardWrapper>
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
            <FormControl
              justifyContent="space-between"
              isInvalid={"name" in errors}
            >
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
                    setErrors({});
                    setInviteNotice(null);
                  }}
                />
                {"name" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.name}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    {inviteNotice ? inviteNotice : "Pick user from list."}
                  </FormControl.HelperText>
                )}
              </VStack>
            </FormControl>
          </VStack>
          <FlatList
            w="100%"
            data={userList}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => adjustInvitationList(item)}
                // onPress={() => {
                //   setData({ ...formData, name: item.email });
                //   setErrors({});
                //   setInviteNotice(null);
                // }}
              >
                <Box
                  borderBottomWidth="1"
                  borderColor="myBorderGray"
                  pl="4"
                  pr="5"
                  py="2"
                >
                  <HStack
                    justifyContent="space-between"
                    bgColor="red.200"
                    overflow="hidden"
                  >
                    <HStack flexShrink="1" flexGrow="0">
                      {item.avatar_url ? (
                        <DP uri={`${item.avatar_url}`} size={40} />
                      ) : (
                        ""
                      )}
                      <VStack>
                        <Text ml="2" color="myDarkGrayText" bold>
                          {item.name}
                        </Text>
                        <Text ml="2" color="myMidGrayText" overflow="hidden">
                          {item.email}
                        </Text>
                      </VStack>
                    </HStack>
                    <Center flexShrink="0" bgColor="myBackgroundGray">
                      {checkUserInvitation(item) ? (
                        <CheckCircleIcon size="xl" color="#20716A" />
                      ) : (
                        <AddIcon size="xl" color="#20716A" />
                      )}
                    </Center>
                  </HStack>
                </Box>
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
          />
          <Button
            variant="myButtonYellowVariant"
            onPress={onSubmit}
            w="100%"
            borderRadius="0"
          >
            Invite
          </Button>
        </CWholeSpaceContentTile>
      </CBackground>
    </KeyboardWrapper>
  );
}

export default Search;
