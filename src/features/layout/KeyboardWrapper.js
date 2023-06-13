import React from "react";
import { Box } from "native-base";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

// This component was created as a hack solution to the clash of two of my very important libraries in
// app, those being react navigation and react native. The keyboardAvoidingView was not taking into account
// height of the header in my nested screens (in stack nav, nested in tab nav). Solution borrowed from in here
// https://github.com/react-navigation/react-navigation/issues/3971
function KeyboardWrapper({ children }) {
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Box paddingTop={headerHeight} h="100%">
          {children}
        </Box>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default KeyboardWrapper;
