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
  View,
  ScrollView,
} from "native-base";
import { client_id } from "@env";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function App() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [posted, setPosted] = useState(false);
  const [errors, setErrors] = useState({});
  // const [avatar, setAvatar] = useState("");
  const headerHeight = useHeaderHeight();

  const validate = () => {
    let newErrors = {};

    checkNameForErrors(newErrors);
    checkEmailForErrors(newErrors);
    checkPasswordForErrors(newErrors);
    checkConfirmPasswordForErrors(newErrors);

    setErrors({ ...errors, ...newErrors });

    if (areAllValuesNull(errors) && areAllValuesNull(newErrors)) {
      setPosted(true);
      return onSubmit();
    }
  };

  function onSubmit() {
    const formData = new FormData();

    // formData.append("user[avatar]", e.target.avatar.files[0]);
    formData.append("user[name]", name);
    formData.append("user[email]", email);
    formData.append("user[password]", password);
    formData.append("user[client_id]", client_id);

    dispatch(registerUserAsync(formData));
  }

  const checkNameForErrors = (newErrors) => {
    if (name === "") {
      newErrors["name"] = "Name is required";
    }
  };

  const checkEmailForErrors = (newErrors) => {
    if (!isEmailValid(email)) {
      newErrors["email"] = "Invalid email format";
    }
    if (email === "") {
      newErrors["email"] = "Email is required";
    }
  };

  const checkPasswordForErrors = (newErrors) => {
    if (!isPasswordStrongEnough(password)) {
      newErrors["password"] =
        "Password should be at least 8 characters long and contain uppercase, lowercase, and at least one digit.";
    }
  };

  const checkConfirmPasswordForErrors = (newErrors) => {
    if (!isConfirmPasswordValid()) {
      newErrors["confirmPassword"] = "Passwords do not match";
    }
  };

  // Function to check if the email is in basic email format
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isConfirmPasswordValid = () => {
    return password === confirmPassword;
  };

  const isPasswordStrongEnough = (password) => {
    // Check if the password is at least 8 characters long and includes at least one uppercase letter, one lowercase letter, and one digit.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  function areAllValuesNull(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== null) {
        return false; // At least one non-null value found
      }
    }
    return true; // All values are null
  }

  // Function to handle the change of any input field
  const handleInputChange = (field) => (newValue) => {
    // Create a copy of the current errors state object
    const updatedErrors = { ...errors };

    // Remove the corresponding key from the copied object based on the field name
    delete updatedErrors[field];

    // Update the state with the new errors object
    setErrors(updatedErrors);
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
              <Box p="2" w="90%" maxW="290" pt="10">
                <Heading size="lg" color="myBlue" fontWeight="semibold">
                  Welcome
                </Heading>
                <Heading mt="1" color="myBlue" fontWeight="medium" size="xs">
                  Sign up to continue!
                </Heading>
                <VStack space={3}>
                  <FormControl isInvalid={errors["name"] !== undefined}>
                    <Box h="6">
                      <FormControl.ErrorMessage>
                        {/* {errors.loginError} */}
                      </FormControl.ErrorMessage>
                      {posted == true ? (
                        <FormControl.HelperText>
                          Registering, please wait...
                        </FormControl.HelperText>
                      ) : null}
                    </Box>

                    <FormControl.Label
                      _text={{
                        color: "myBlue",
                      }}
                    >
                      Name
                    </FormControl.Label>
                    <FormControl.ErrorMessage>
                      {errors.name}
                    </FormControl.ErrorMessage>
                    <Input
                      type="name"
                      color="myBlue"
                      value={name}
                      onChange={(e) => {
                        setName(e.nativeEvent.text);
                        handleInputChange("name")();
                        console.log(errors);
                      }}
                      isInvalid={errors["name"]}
                    />
                  </FormControl>
                  <FormControl isInvalid={errors["email"] !== undefined}>
                    <FormControl.Label
                      _text={{
                        color: "myBlue",
                      }}
                    >
                      Email
                    </FormControl.Label>
                    <FormControl.ErrorMessage>
                      {errors.email}
                    </FormControl.ErrorMessage>
                    <Input
                      type="email"
                      color="myBlue"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.nativeEvent.text);
                        handleInputChange("email")();
                      }}
                      isInvalid={errors["email"]}
                    />
                  </FormControl>
                  <FormControl isInvalid={errors["password"] !== undefined}>
                    <FormControl.Label
                      _text={{
                        color: "myBlue",
                      }}
                    >
                      Password
                    </FormControl.Label>
                    <FormControl.ErrorMessage>
                      {errors.password}
                    </FormControl.ErrorMessage>
                    <Input
                      type="password"
                      color="myBlue"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.nativeEvent.text);
                        handleInputChange("password")();
                      }}
                      isInvalid={errors["password"]}
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={errors["confirmPassword"] !== undefined}
                  >
                    <FormControl.Label
                      _text={{
                        color: "myBlue",
                      }}
                    >
                      Confirm Password
                    </FormControl.Label>
                    <FormControl.ErrorMessage>
                      {errors.confirmPassword}
                    </FormControl.ErrorMessage>
                    <Input
                      type="password"
                      color="myBlue"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.nativeEvent.text);
                        handleInputChange("confirmPassword")();
                      }}
                      isInvalid={errors["confirmPassword"]}
                    />
                  </FormControl>
                  <Button
                    mt="2"
                    variant="myButtonYellowVariant"
                    onPress={() => {
                      validate();
                    }}
                  >
                    Sign up
                  </Button>
                </VStack>
              </Box>
            </Center>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
