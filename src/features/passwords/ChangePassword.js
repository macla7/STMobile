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
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [avatar, setAvatar] = useState("");

  function onSubmit() {
    const formData = new FormData();

    // formData.append("user[avatar]", e.target.avatar.files[0]);
    formData.append("user[name]", name);
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    formData.append(
      "user[client_id]",
      "Lm-9XiqY8dZOCoeX3mZrDhCjFY99IAUnp-Y82YpZz_k"
    );

    dispatch(registerUserAsync(formData));
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
            Change Password
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
            Add numbers and symbols to make password more secure
          </Heading>
          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Confirm Password</FormControl.Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
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
