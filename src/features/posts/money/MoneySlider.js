import React, { useState } from "react";
import { Box, Stack, Text, Slider, Heading } from "native-base";
import { useDispatch } from "react-redux";
import { setMoney } from "./moneySlice";

function MoneySlider(props) {
  const [onChangeValue, setOnChangeValue] = useState(props.defaultValue);
  const dispatch = useDispatch();

  function helperText() {
    if (props.type == "reserve") {
      if (onChangeValue <= 0) {
        return (
          "The maximum you are willing to pay someone to take your shift is: $" +
          -1 * onChangeValue
        );
      }
      return (
        "The minimum you are willing to accept for your shift is: $" +
        onChangeValue
      );
    } else {
      // when the monetary amount is for a Bid
      if (onChangeValue <= 0) {
        return "To take the shift, you are seeking: $" + -1 * onChangeValue;
      }
      return "To take the shift, you are willing to offer: $" + onChangeValue;
    }
  }

  function title() {
    if (props.type == "reserve") {
      if (onChangeValue <= 0) {
        return "You Pay $" + -1 * onChangeValue;
      }
      return "You Get $" + onChangeValue;
    } else {
      if (onChangeValue <= 0) {
        return "You Get $" + -1 * onChangeValue;
      }
      return "You Pay $" + onChangeValue;
    }
  }

  return (
    <Box alignItems="center" w="100%">
      <Stack space={4} alignItems="center" w="90%">
        <Heading size="md" fontWeight="600" color="myDarkGrayText">
          {title()}
        </Heading>

        <Slider
          defaultValue={props.defaultValue}
          minValue={props.minValue}
          maxValue={props.maxValue}
          size="lg"
          colorScheme={onChangeValue > 0 ? "emerald" : "lightBlue"}
          onChange={(v) => {
            setOnChangeValue(Math.floor(v));
          }}
          onChangeEnd={(v) => {
            dispatch(setMoney(v * 1000000));
          }}
        >
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
        <Text textAlign="center">{helperText()}</Text>
      </Stack>
    </Box>
  );
}

export default MoneySlider;
