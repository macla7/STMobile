import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "../sessions/sessionSlice";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Pressable,
} from "native-base";
import { Keyboard } from "react-native";

export default function App() {
  const [token, setToken] = useState("");

  function onSubmit() {
    // just want to go to the next screen, with token now.
    // Is there a way to validate the token first
  }

  return (
    <Pressable onPress={Keyboard.dismiss}>
      <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
          <Heading
            size="lg"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
            fontWeight="semibold"
          >
            Reset Password
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="medium"
            size="xs"
          >
            Enter token to continue!
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Token</FormControl.Label>
              <Input
                type="token"
                value={token}
                onChange={(e) => setToken(e.nativeEvent.text)}
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
