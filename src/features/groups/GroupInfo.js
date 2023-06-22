import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "native-base";
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
import { useHeaderHeight } from "@react-navigation/elements";

function GroupInfo({ route, navigation }) {
  const dispatch = useDispatch();
  const { group } = route.params;
  const userId = useSelector((state) => state.sessions.user.id);
  const memberships = useSelector(selectMemberships);

  useEffect(() => {
    dispatch(isUserAMember(userId));
    dispatch(isUserAnAdmin(userId));
  }, [memberships.length]);

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <Memberships memberships={memberships} />
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
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default GroupInfo;
