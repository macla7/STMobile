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
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.nativeEvent.text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
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
            <Button mt="2" colorScheme="indigo" onPress={() => onSubmit()}>
              Sign in
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                I'm a new user.{" "}
              </Text>
              <Text
                fontSize="xs"
                fontWeight="500"
                color="indigo.500"
                onPress={() => navigation.navigate("Register")}
              >
                Sign up
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </Pressable>
  );
}

export default Login;
