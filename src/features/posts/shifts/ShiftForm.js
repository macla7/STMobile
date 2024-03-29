import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createShift, editShift } from "./shiftSlice";
import { VStack, FormControl, Button, TextArea, View } from "native-base";
import { CScrollBackground, CContentTile } from "../../layout/LayoutComponents";
import { format, compareAsc } from "date-fns";
import KeyboardWrapper from "../../layout/KeyboardWrapper";

// Design is to be able to add multiple shifts to a post
function ShiftForm({ navigation, route }) {
  const { start, end, initPosition, editingMode, tempId, endsAt } =
    route.params;
  const dispatch = useDispatch();
  const { returnScreen } = route.params;
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData({ ...formData, start: start, end: end, position: initPosition });
  }, []);

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  const validate = () => {
    let newErrors = {};

    checkPositionForErrors(newErrors);
    checkStartTimeForErrors(newErrors);
    checkEndTimeForErrors(newErrors);

    setErrors({ ...errors, ...newErrors });
    if (areAllValuesNull(errors)) {
      return submitForm();
    }
  };

  const checkPositionForErrors = (newErrors) => {
    if (formData.position === "") {
      newErrors["position"] = "Position is required";
    }
  };

  const checkStartTimeForErrors = (newErrors) => {
    if (new Date(start).getTime() < new Date(endsAt).getTime()) {
      newErrors["start"] = "Start time cannot be before when the Post ends";
    }
  };

  const checkEndTimeForErrors = (newErrors) => {
    if (compareAsc(new Date(end), new Date(start)) !== 1) {
      newErrors["end"] = "End time must be after the Shift starts";
    }
  };

  function areAllValuesNull(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== null) {
        return false; // At least one non-null value found
      }
    }
    return true; // All values are null
  }

  function submitForm() {
    if (editingMode) {
      const shift = {
        position: formData.position,
        start: start.toString(),
        end: end.toString(),
        tempId: tempId,
      };
      dispatch(editShift(shift));
    } else {
      const shift = {
        position: formData.position,
        start: start.toString(),
        end: end.toString(),
      };
      dispatch(createShift(shift));
    }

    navigation.navigate({
      name: returnScreen,
      merge: true,
    });
    return true;
  }

  return (
    <KeyboardWrapper>
      <View flex="1">
        <CScrollBackground>
          <CContentTile>
            <VStack w="100%">
              <FormControl
                isInvalid={["position", "start", "end"].some((error) =>
                  Object.keys(errors).includes(error)
                )}
              >
                <FormControl.Label mb="-1">Position</FormControl.Label>
                {errors["position"] ? (
                  <FormControl.ErrorMessage>
                    {errors.position}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    Details of shift
                  </FormControl.HelperText>
                )}
                <TextArea
                  mt="2"
                  h={20}
                  isInvalid={errors["position"]}
                  placeholder="Add description of your shift here.."
                  name="position"
                  value={formData.position}
                  onChangeText={(value) => {
                    setData({ ...formData, position: value });
                    setErrors({ ...errors, position: null });
                  }}
                />

                <FormControl.Label mb="-1">Shift start time</FormControl.Label>
                {errors["start"] ? (
                  <FormControl.ErrorMessage>
                    {errors.start}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    Has to be after the Post finishes.
                  </FormControl.HelperText>
                )}
                <Button
                  fontSize="md"
                  fontWeight="400"
                  color="myDarkGrayText"
                  variant="Unstyled"
                  display="flex"
                  justifyContent="flex-start"
                  borderColor={errors["start"] ? "error.600" : "muted.300"}
                  borderWidth="1"
                  p="2"
                  mt="2"
                  mx="1"
                  onPress={() => {
                    navigation.navigate("Time and Date", {
                      initDate: start,
                      returnType: "start",
                      returnScreen: "Add Shift",
                      mode: "Shift Starts",
                      helperText: "Set the start time of your shift.",
                    });
                    setErrors({ ...errors, start: null });
                  }}
                >
                  {format(new Date(start), "p - EEEE do LLL")}
                </Button>

                <FormControl.Label mb="-1">Shift end time</FormControl.Label>
                {"end" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.end}
                  </FormControl.ErrorMessage>
                ) : (
                  <FormControl.HelperText>
                    Has to be after the start time.
                  </FormControl.HelperText>
                )}
                <Button
                  fontSize="md"
                  fontWeight="400"
                  color="myDarkGrayText"
                  variant="Unstyled"
                  display="flex"
                  justifyContent="flex-start"
                  borderColor={errors["end"] ? "error.600" : "muted.300"}
                  borderWidth="1"
                  p="2"
                  mt="2"
                  mx="1"
                  onPress={() => {
                    navigation.navigate("Time and Date", {
                      initDate: end,
                      returnType: "end",
                      returnScreen: "Add Shift",
                      mode: "Shift Ends",
                      helperText: "Set the end time of your shift.",
                    });
                    setErrors({ ...errors, end: null });
                  }}
                >
                  {format(new Date(end), "p - EEEE do LLL")}
                </Button>
              </FormControl>
            </VStack>
          </CContentTile>
        </CScrollBackground>
      </View>
      <Button
        variant="myButtonYellowVariant"
        onPress={onSubmit}
        borderRadius="9"
        margin="2"
      >
        {editingMode ? "Edit Shift" : "Create Shift"}
      </Button>
    </KeyboardWrapper>
  );
}

export default ShiftForm;
