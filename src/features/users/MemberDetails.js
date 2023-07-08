import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CScrollBackground, CContentTile } from "../layout/LayoutComponents";
import {
  Heading,
  Button,
  VStack,
  Box,
  HStack,
  Center,
  Text,
} from "native-base";

import { selectUserId } from "../sessions/sessionSlice";
import KeyboardWrapper from "../layout/KeyboardWrapper";
import DP from "../layout/DP";
import { parseISO, format } from "date-fns";
import {
  selectIsAdmin,
  updateMembershipAsync,
} from "../groups/memberships/membershipSlice";

function MemberDetails({ route, navigation }) {
  const dispatch = useDispatch();
  const { member } = route.params;
  const isAdmin = useSelector(selectIsAdmin);
  const userId = useSelector(selectUserId);

  function since(member) {
    return format(parseISO(member.created_at), "EEE do LLL").toString();
  }

  function demoteMember() {
    let memberDetails = {
      id: member.id,
      group_id: member.group_id,
      role: 1,
    };
    dispatch(updateMembershipAsync(memberDetails));
  }

  function promoteMember() {
    let memberDetails = {
      id: member.id,
      group_id: member.group_id,
      role: 0,
    };
    dispatch(updateMembershipAsync(memberDetails));
  }

  function kickMember() {
    let memberDetails = {
      id: member.id,
      group_id: member.group_id,
      status: 2,
    };
    dispatch(updateMembershipAsync(memberDetails));
  }

  return (
    <KeyboardWrapper>
      <CScrollBackground>
        <VStack h="100%" w="100%">
          <CContentTile>
            {/* Profile Picture */}
            <HStack justifyContent="space-between" w="100%">
              <Center>
                <Heading size="md" fontWeight="600" color="myDarkGrayText">
                  {member.user.name}
                </Heading>
              </Center>
            </HStack>

            <Box shadow="3">
              <DP uri={`${member.user.avatar_url}`} size={200} />
            </Box>

            <HStack justifyContent="space-between" w="100%">
              <Center h="41">
                <Heading size="md" fontWeight="600" color="myDarkGrayText">
                  Email
                </Heading>
              </Center>
            </HStack>

            <HStack w="100%">
              <Text>{member.user.email}</Text>
            </HStack>

            <HStack justifyContent="space-between" w="100%">
              <Center h="41">
                <Heading size="md" fontWeight="600" color="myDarkGrayText">
                  Member Since
                </Heading>
              </Center>
            </HStack>

            <HStack w="100%">
              <Text>Since {since(member)}</Text>
            </HStack>

            {isAdmin && member.user.id != userId ? (
              <>
                <HStack
                  justifyContent="space-between"
                  w="100%"
                  mt="8"
                  pt="4"
                  borderTopWidth="1"
                  borderColor="myBorderGray"
                >
                  <Center>
                    <Heading size="md" fontWeight="600" color="myDarkGrayText">
                      Actions
                    </Heading>
                  </Center>
                </HStack>

                <HStack w="100%" mt="2">
                  {member.role == "admin" ? (
                    <Button
                      variant="myButtonGrayVariant"
                      onPress={() => {
                        demoteMember();
                        navigation.goBack();
                      }}
                      h="8"
                      p="1"
                      flex="1"
                      mr="1"
                    >
                      Demote to Member
                    </Button>
                  ) : (
                    <Button
                      variant="myButtonYellowVariant"
                      onPress={() => {
                        promoteMember();
                        navigation.goBack();
                      }}
                      h="8"
                      p="1"
                      flex="1"
                      mr="1"
                    >
                      Promote to Admin
                    </Button>
                  )}

                  <Button
                    variant="myButtonYellowVariant"
                    onPress={() => {
                      kickMember();
                      navigation.goBack();
                    }}
                    h="8"
                    p="1"
                    flex="1"
                    ml="1"
                  >
                    Kick from Group
                  </Button>
                </HStack>
              </>
            ) : null}

            {/* {member.user.id == userId ? (
              <>
                <HStack
                  justifyContent="space-between"
                  w="100%"
                  mt="8"
                  pt="4"
                  borderTopWidth="1"
                  borderColor="myBorderGray"
                >
                  <Center>
                    <Heading size="md" fontWeight="600" color="myDarkGrayText">
                      Actions
                    </Heading>
                  </Center>
                </HStack>
                <HStack w="100%" mt="2">
                  <Button
                    variant="myButtonYellowVariant"
                    onPress={() => {
                      kickMember();
                      navigation.goBack();
                    }}
                    h="8"
                    p="1"
                    flex="1"
                    ml="1"
                  >
                    Leave Group
                  </Button>
                </HStack>
              </>
            ) : null} */}
          </CContentTile>
        </VStack>
      </CScrollBackground>
    </KeyboardWrapper>
  );
}

export default MemberDetails;
