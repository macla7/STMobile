import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CScrollBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import { Button, Text, Box, HStack, Spacer } from "native-base";
import { useIsFocused } from "@react-navigation/native";
import { selectNewUser, noLongerNewUser } from "../sessions/sessionSlice";

function Info({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const newUser = useSelector(selectNewUser);

  useEffect(() => {
    if (newUser) {
      dispatch(noLongerNewUser());
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      setIsLoading(false);
    }
  }, [isFocused]);

  return (
    <CScrollBackground>
      <CWholeSpaceContentTile>
        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>Welcome to Shift It.</Text>
          </HStack>
        </Box>

        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>
              We provide a marketplace for you to auction your shifts, meaning
              you can get your shifts covered easier and quicker
            </Text>
          </HStack>
        </Box>
        {isLoading ? <Text>Loading...</Text> : null}
        <HStack w="90%">
          <Spacer />
          <Spacer />
          <Button
            variant="myButtonYellowVariant"
            onPress={() => {
              setIsLoading(true);
              navigation.navigate("InfoSecond");
            }}
            flex="1"
            borderRadius="6"
            mb="6"
            mt="2"
          >
            Next
          </Button>
        </HStack>
        <Text>Page 1 of 3</Text>
      </CWholeSpaceContentTile>
    </CScrollBackground>
  );
}

export default Info;
