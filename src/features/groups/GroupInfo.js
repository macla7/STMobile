import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, HStack } from "native-base";
import {
  selectMemberships,
  isUserAMember,
  isUserAnAdmin,
  fetchMembershipsAsync,
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
  const memberships = useSelector(selectMemberships);

  useEffect(() => {
    dispatch(fetchMembershipsAsync(group.id));
  }, []);

  useEffect(() => {
    dispatch(isUserAMember(userId));
    dispatch(isUserAnAdmin(userId));
  }, [memberships.length]);

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <Memberships memberships={memberships} navigation={navigation} />
        <HStack>
          <Button
            variant="myButtonYellowVariant"
            flex="1"
            onPress={() =>
              navigation.navigate("Invite", {
                group: group,
              })
            }
            borderRadius="0"
          >
            Invite
          </Button>
        </HStack>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default GroupInfo;
