import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, FlatList, VStack, Box, HStack } from "native-base";
import {
  selectMemberships,
  isUserAMember,
  isUserAnAdmin,
  selectIsAdmin,
} from "./memberships/membershipSlice";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import Memberships from "./memberships/Memberships";

function GroupInfo({ route, navigation }) {
  const dispatch = useDispatch();
  const { group } = route.params;
  const userId = useSelector((state) => state.sessions.user.id);
  const isAdmin = useSelector(selectIsAdmin);
  const memberships = useSelector(selectMemberships);

  useEffect(() => {
    dispatch(isUserAMember(userId));
    dispatch(isUserAnAdmin(userId));
  }, [memberships.length]);

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <Text>You are {isAdmin ? "an Admin" : "a Member"}</Text>
        <Memberships memberships={memberships} />
        <VStack w="100%">
          <Button
            variant="myButtonYellowVariant"
            onPress={() =>
              navigation.navigate("Invite", {
                group: group,
              })
            }
            w="100%"
            borderRadius="0"
          >
            Invite
          </Button>
        </VStack>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default GroupInfo;
