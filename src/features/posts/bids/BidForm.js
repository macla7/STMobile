import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "native-base";
import { selectMoney, setMoney } from "../money/moneySlice";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../../layout/LayoutComponents";
import MoneySlider from "../money/MoneySlider";

function BidForm({ route, navigation }) {
  const currentMicroDollars = useSelector(selectMoney);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { reserve, returnScreen, postId } = route.params;

  useEffect(() => {
    setDescription(createDescription());
  }, [currentMicroDollars]);

  function createDescription() {
    if (currentMicroDollars > 0) {
      return "Offering To Pay";
    }
    return "Asking For";
  }

  // on init component sets state to reserve passed in route params
  useEffect(() => {
    dispatch(setMoney(reserve + 5 * 1000000));
  }, []);

  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <MoneySlider
          type="bid"
          minValue={reserve / 1000000 + 1}
          maxValue={reserve / 1000000 + 50}
          defaultValue={reserve / 1000000 + 5}
        />
        <Button
          mt="2"
          variant="myButtonYellowVariant"
          onPress={() => {
            // Pass and merge params back to home screen
            navigation.navigate("Bid Confirmation", {
              returnScreen: returnScreen,
              currentMicroDollars: currentMicroDollars,
              description: description,
              postId: postId,
            });
          }}
        >
          Create Bid
        </Button>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default BidForm;
