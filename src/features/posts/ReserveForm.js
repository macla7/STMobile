import React from "react";
import { useSelector } from "react-redux";
import { Button } from "native-base";
import { selectMoney } from "./money/moneySlice";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import MoneySlider from "./money/MoneySlider";

function ReserveForm({ route, navigation }) {
  const currentMicroDollars = useSelector(selectMoney);
  const { returnScreen } = route.params;

  return (
    <>
      <CBackground>
        <CWholeSpaceContentTile>
          <MoneySlider
            type="reserve"
            minValue={-100}
            maxValue={100}
            defaultValue={0}
          />
        </CWholeSpaceContentTile>
      </CBackground>
      <Button
        variant="myButtonYellowVariant"
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: returnScreen,
            params: { reserve: currentMicroDollars },
            merge: true,
          });
        }}
        w="100%"
        borderRadius="0"
      >
        Done
      </Button>
    </>
  );
}

export default ReserveForm;
