import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAsync,
  selectLoginError,
  clearLoginError,
  selectStatus,
} from "./sessionSlice";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  ScrollView,
  Text,
  View,
  Flex,
} from "native-base";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginError = useSelector(selectLoginError);
  const [errors, setErrors] = useState({});
  const headerHeight = useHeaderHeight();
  const [rememberMe, setRememberMe] = useState(false);
  const status = useSelector(selectStatus);
  const [throbbingValue] = useState(new Animated.Value(1));

  useEffect(() => {
    startThrobAnimation();
  }, []);

  const startThrobAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(throbbingValue, {
          toValue: 1.05,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(throbbingValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    checkRememberMe();
  }, []);

  const checkRememberMe = async () => {
    try {
      const emailFromStorage = await AsyncStorage.getItem("email");
      const passwordFromStorage = await AsyncStorage.getItem("password");

      if (emailFromStorage && passwordFromStorage) {
        setEmail(emailFromStorage);
        setPassword(passwordFromStorage);
        setRememberMe(true);
      }
    } catch (error) {
      console.error("Error checking Remember Me:", error);
    }
  };

  useEffect(() => {
    setErrors({ ...errors, loginError: loginError });
  }, [loginError]);

  function onSubmit() {
    const registerUserDetails = {
      email: email.toLowerCase(),
      password: password,
    };

    if (rememberMe) {
      // Save the credentials to AsyncStorage if 'Remember Me' is checked
      saveCredentials(email.toLowerCase(), password);
    } else {
      // Clear any saved credentials from AsyncStorage if 'Remember Me' is not checked
      clearCredentials();
    }

    dispatch(loginUserAsync(registerUserDetails));
  }

  const saveCredentials = async (email, password) => {
    try {
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
    } catch (error) {
      console.error("Error saving credentials:", error);
    }
  };

  const clearCredentials = async () => {
    try {
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("password");
    } catch (error) {
      console.error("Error clearing credentials:", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View pt={headerHeight - 5 + "px"} h="100%">
          <ScrollView
            w="100%"
            contentContainerStyle={{ flexGrow: 1 }}
            shadow="6"
          >
            <Center>
              <Box p="2" w="90%" maxW="290" pt="100">
                <Heading size="xl" fontWeight="600" color="myBlue">
                  Welcome
                </Heading>

                <Heading mt="1" color="myBlue" fontWeight="medium" size="xs">
                  Sign in to continue!
                </Heading>

                <VStack space={3}>
                  <FormControl
                    color="myBlue"
                    isInvalid={errors.loginError !== ""}
                  >
                    <Box h="6" pt="2">
                      <FormControl.ErrorMessage>
                        {errors.loginError}
                      </FormControl.ErrorMessage>
                      <Flex alignItems="start" justifyContent="center">
                        <Animated.Text
                          style={{
                            transform: [{ scale: throbbingValue }],
                          }}
                        >
                          <FormControl.HelperText>
                            {status != "Not Fetched" && status != "Up To Date"
                              ? status
                              : ""}
                          </FormControl.HelperText>
                        </Animated.Text>
                      </Flex>
                    </Box>

                    <FormControl.Label
                      _text={{
                        color: "myBlue",
                      }}
                    >
                      Email ID
                    </FormControl.Label>
                    <Input
                      color="myBlue"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.nativeEvent.text);
                        dispatch(clearLoginError());
                      }}
                    />

                    <FormControl.Label
                      _text={{
                        color: "myBlue",
                      }}
                    >
                      Password
                    </FormControl.Label>
                    <Input
                      color="myBlue"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.nativeEvent.text);
                        dispatch(clearLoginError());
                      }}
                    />
                  </FormControl>
                  <HStack alignItems="center">
                    <BouncyCheckbox
                      size={30}
                      fillColor="#4243ed"
                      iconStyle={{ margin: 0 }}
                      disableBuiltInState
                      onPress={() => setRememberMe(!rememberMe)}
                      isChecked={rememberMe}
                    />
                    <Text>Remember Me</Text>
                  </HStack>
                  <Button
                    mt="2"
                    variant="myButtonYellowVariant"
                    onPress={() => onSubmit()}
                  >
                    Sign in
                  </Button>
                  <VStack>
                    <HStack mt="6" justifyContent="center">
                      <Text fontSize="sm" color="myBlue">
                        I'm a new user{" "}
                      </Text>
                      <Center>
                        <Text
                          fontSize="xs"
                          fontWeight="500"
                          color="myBlue"
                          underline
                          onPress={() => navigation.navigate("Register")}
                        >
                          Sign up
                        </Text>
                      </Center>
                    </HStack>

                    <HStack mt="6" justifyContent="center">
                      <Text
                        fontSize="xs"
                        fontWeight="500"
                        color="myBlue"
                        underline
                        onPress={() => navigation.navigate("EmailForm")}
                      >
                        Forgot password
                      </Text>
                    </HStack>
                  </VStack>
                </VStack>
              </Box>
            </Center>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default Login;
