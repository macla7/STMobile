import React, { useEffect, useState } from "react";
import {
  Heading,
  VStack,
  FormControl,
  Button,
  Text,
  View,
  Center,
  HStack,
} from "native-base";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { CBackground, CContentTile } from "../layout/LayoutComponents";
import { format } from "date-fns";

function MyDateTimePicker({ route, navigation }) {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const { initDate, returnType, returnScreen, text } = route.params;
  const [date, setDate] = useState(new Date(Date.now()));

  useEffect(() => {
    setDate(new Date(initDate));
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  function returnParams() {
    switch (returnType) {
      case "date":
        return {
          date: date.toString(),
        };
      case "start":
        return {
          start: date.toString(),
          end: date.toString(),
        };
      case "end":
        return {
          end: date.toString(),
        };
    }
  }

  return (
    <CBackground>
      <CContentTile>
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          {text}
        </Heading>
        <VStack w="100%">
          {show && (
            <DateTimePicker
              minimumDate={new Date(Date.now())}
              minuteInterval={5}
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChange}
            />
          )}
          <FormControl>
            <View>
              <HStack>
                <Button
                  onPress={showDatepicker}
                  variant="myButtonYellowVariant"
                  mt="2"
                  flex={1}
                  mx="2"
                >
                  Pick Date
                </Button>
                <Button
                  onPress={showTimepicker}
                  variant="myButtonYellowVariant"
                  mt="2"
                  mr="2"
                  flex={1}
                >
                  Pick Time
                </Button>
              </HStack>
              <Center padding="2" my="2">
                <Text fontSize="lg">
                  {format(new Date(date), "EEE do LLL")}
                </Text>
                <Text fontSize="lg">{format(new Date(date), "p")}</Text>
              </Center>
            </View>
          </FormControl>

          <Button
            variant="myButtonYellowVariant"
            onPress={() => {
              // Pass and merge params back to home screen
              navigation.navigate({
                name: returnScreen,
                params: returnParams(),
                merge: true,
              });
            }}
          >
            Done
          </Button>
        </VStack>
      </CContentTile>
    </CBackground>
  );
}

export default MyDateTimePicker;
