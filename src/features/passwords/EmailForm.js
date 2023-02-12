import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getResetPasswordInstructionsAsync } from "./passwordSlice";
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

  function onSubmit() {
    const userDetails = {
      user: {
        email: email,
      },
      commit: "Send me reset password instructions",
    };
    dispatch(getResetPasswordInstructionsAsync(userDetails));
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
            Forgot Password
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
            Enter email to recieve reset password instructions.
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

            <Button mt="2" colorScheme="indigo" onPress={() => onSubmit()}>
              Submit
            </Button>
          </VStack>
        </Box>
      </Center>
    </Pressable>
  );
}

export default Login;
