import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AuthFlow from "./src/features/authFlow/AuthFlow";
import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { NativeBaseProvider } from "native-base";
import { theme } from "./theme";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Text } from "native-base";

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <></>;
  }

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <NativeBaseProvider theme={theme}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            height="100%"
          >
            {/* <StatusBar animated={true} backgroundColor="#61dafb" style="dark" /> */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <AuthFlow />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
