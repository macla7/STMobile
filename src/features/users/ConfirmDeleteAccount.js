import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text } from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import { destroyUserAsync } from "./userSlice";
import {
  destroyPushTokenAsync,
  selectCurrentPushToken,
} from "../users/pushTokenSlice";
import { logoutUserAsync } from "../sessions/sessionSlice";

function ConfirmDeleteAccount({ route, navigation }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const currentPushToken = useSelector(selectCurrentPushToken);
  const dispatch = useDispatch();

  function onDestroy() {
    if (currentPushToken.id != 0) {
      console.log("deleting push Token");
      dispatch(destroyPushTokenAsync(currentPushToken));
    }
    dispatch(destroyUserAsync(userId));
    dispatch(logoutUserAsync());
  }

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <Text>Do you want to permanently this account?</Text>
        <Button
          mt="2"
          color="white"
          bgColor="myPink"
          onPress={() => {
            onDestroy();
          }}
        >
          Confirm
        </Button>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default ConfirmDeleteAccount;
