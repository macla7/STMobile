import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUserAsync } from "./sessionSlice";
import {
  Center,
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
} from "native-base";
import { client_id } from "@env";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

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
    formData.append("user[client_id]", client_id);

    dispatch(registerUserAsync(formData));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Center w="100%">
          <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size="lg" color="myDarkGrayText" fontWeight="semibold">
              Welcome
            </Heading>
            <Heading mt="1" color="myMidGrayText" fontWeight="medium" size="xs">
              Sign up to continue!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Name</FormControl.Label>
                <Input
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.nativeEvent.text)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
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
              </FormControl>
              <FormControl>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                />
              </FormControl>
              <Button
                mt="2"
                variant="myButtonYellowVariant"
                onPress={() => onSubmit()}
              >
                Sign up
              </Button>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
