import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAsync,
  selectLoginError,
  clearLoginError,
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
  Text,
} from "native-base";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginError = useSelector(selectLoginError);
  const [errors, setErrors] = useState({});

  function onSubmit() {
    const registerUserDetails = {
      email: email,
      password: password,
    };

    dispatch(loginUserAsync(registerUserDetails));
  }

  useEffect(() => {
    setErrors({ ...errors, loginError: loginError });
  }, [loginError]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Center>
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="xl" fontWeight="600" color="myDarkGreen">
              Welcome
            </Heading>
            <Heading mt="1" color="myDarkGreen" fontWeight="medium" size="xs">
              Sign in to continue!
            </Heading>

            <VStack space={3}>
              <FormControl
                color="myDarkGreen"
                isInvalid={errors.loginError !== ""}
              >
                <Box h="6">
                  <FormControl.ErrorMessage>
                    {errors.loginError}
                  </FormControl.ErrorMessage>
                </Box>

                <FormControl.Label
                  _text={{
                    color: "myDarkGreen",
                  }}
                >
                  Email ID
                </FormControl.Label>
                <Input
                  color="myDarkGreen"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.nativeEvent.text);
                    dispatch(clearLoginError());
                  }}
                />

                <FormControl.Label
                  _text={{
                    color: "myDarkGreen",
                  }}
                >
                  Password
                </FormControl.Label>
                <Input
                  color="myDarkGreen"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.nativeEvent.text);
                    dispatch(clearLoginError());
                  }}
                />
              </FormControl>
              <Button
                mt="2"
                variant="myButtonYellowVariant"
                onPress={() => onSubmit()}
              >
                Sign in
              </Button>
              <VStack>
                <HStack mt="6" justifyContent="center">
                  <Text fontSize="sm" color="myDarkGreen">
                    I'm a new user{" "}
                  </Text>
                  <Center>
                    <Text
                      fontSize="xs"
                      fontWeight="500"
                      color="myDarkGreen"
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
                    color="myDarkGreen"
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

export default Login;
