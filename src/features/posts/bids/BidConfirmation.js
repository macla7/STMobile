import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CBackground, CContentTile } from "../../layout/LayoutComponents";
import { Heading, Button, Text, Pressable, Center } from "native-base";
import { Keyboard } from "react-native";
import { createBidAsync } from "../postSlice";
import { createNotificationBlueprint } from "../../notifications/notificationBlueprintAPI";

function BidConfirmation({ route, navigation }) {
  const userId = useSelector((state) => state.sessions.user.id);
  const dispatch = useDispatch();
  const { returnScreen, description, currentMicroDollars, postId } =
    route.params;

  function bidPost(microDollars) {
    let bidDetails = {
      post_id: postId,
      user_id: userId,
      price: microDollars,
    };

    dispatch(createBidAsync(bidDetails));

    // if above succeeds ..?
    let notification_blueprint = {
      notificationable_type: "Post",
      notificationable_id: postId,
      notification_type: 5,
    };
    let second_notification_blueprint = {
      notificationable_type: "Post",
      notificationable_id: postId,
      notification_type: 6,
    };

    createNotificationBlueprint(notification_blueprint);
    createNotificationBlueprint(second_notification_blueprint);
  }

  function handleDollarsNegative(dollars) {
    if (dollars < 0) {
      return "$" + (dollars * -1) / 1000000;
    }
    return "$" + dollars / 1000000;
  }

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <CBackground>
        <Center h="100%">
          <CContentTile>
            <Heading size="lg" fontWeight="600" color="myDarkGrayText">
              Bid Details
            </Heading>
            <Text>
              You are {description.toLowerCase() + " "}
              {handleDollarsNegative(currentMicroDollars)}
            </Text>
            <Button
              mt="2"
              variant="myButtonYellowVariant"
              onPress={() => {
                // Pass and merge params back to home screen
                bidPost(currentMicroDollars);
                navigation.navigate(returnScreen);
              }}
            >
              Confirm
            </Button>
          </CContentTile>
        </Center>
      </CBackground>
    </Pressable>
  );
}

export default BidConfirmation;
