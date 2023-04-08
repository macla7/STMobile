import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import AuthStackScreen from "./src/features/authFlow/AuthStackScreen";
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
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            height="100%"
          >
            <StatusBar style="light" />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <AuthStackScreen />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
