import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "./sessionSlice";
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
  Pressable,
} from "native-base";
import { Keyboard } from "react-native";

function Login({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("fred@bing.com");
  const [password, setPassword] = useState("Bing123!");

  function onSubmit() {
    const registerUserDetails = {
      email: email,
      password: password,
    };

    dispatch(loginUserAsync(registerUserDetails));
  }

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <Box bgColor="myBackgroundGray" h="100%">
        <Center>
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Heading size="xl" fontWeight="600" color="myDarkGreen">
              Welcome
            </Heading>
            <Heading mt="1" color="myDarkGreen" fontWeight="medium" size="xs">
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl color="myDarkGreen">
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
                  onChange={(e) => setEmail(e.nativeEvent.text)}
                />
              </FormControl>
              <FormControl>
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
                  onChange={(e) => setPassword(e.nativeEvent.text)}
                />
                {/* <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link> */}
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
                      color="myLightGreen"
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
                    color="myLightGreen"
                    onPress={() => navigation.navigate("EmailForm")}
                  >
                    Forgot password
                  </Text>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </Center>
      </Box>
    </Pressable>
  );
}

export default Login;
