import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostAsync, selectFreshPost } from "./postSlice";
import { resetShifts, selectShifts } from "./shifts/shiftSlice";
import { createNotificationBlueprint } from "../notifications/notificationBlueprintAPI";
import { VStack, FormControl, Button, TextArea, View } from "native-base";
import Money from "../posts/money/Money";
import Shift from "./shifts/Shift";
import { CScrollBackground, CContentTile } from "../layout/LayoutComponents";
import { compareAsc, format, addMinutes } from "date-fns";
import KeyboardWrapper from "../layout/KeyboardWrapper";

function PostForm({ route, navigation }) {
  const dispatch = useDispatch();
  const shifts = useSelector(selectShifts);
  const { postEndsDate, groupId, groupName, reserve } = route.params;
  const [formData, setData] = useState({});
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [invalidShiftIds, setInvalidShiftIds] = useState([]);
  const freshPost = useSelector(selectFreshPost);

  useEffect(() => {
    if (freshPost.id != 0) {
      let notification_blueprint = {
        notificationable_type: "Post",
        notificationable_id: freshPost.id,
        notification_type: 4,
      };

      createNotificationBlueprint(notification_blueprint);

      dispatch(resetShifts());
    }
  }, [freshPost.id]);

  useEffect(() => {
    dispatch(resetShifts());
  }, []);

  useEffect(() => {
    setData({ ...formData, endsAt: postEndsDate });
  }, []);

  const onSubmit = () => {
    validate() ? console.log("Submitted") : console.log("Validation Failed");
  };

  const validate = () => {
    let newErrors = {};

    checkDescriptionForErrors(newErrors);
    checkShiftsForErrors(newErrors);
    checkPostEndsDateForErrors(newErrors);
    checkGroupForErrors(newErrors);

    setErrors({ ...errors, ...newErrors });

    if (areAllValuesNull(errors) && areAllValuesNull(newErrors)) {
      return submitPost();
    }
  };

  useEffect(() => {
    setData({ ...formData, endsAt: postEndsDate });
  }, [errors]);

  function submitPost() {
    let post = {
      body: description,
      ends_at: postEndsDate,
      group_id: groupId,
      reserve: reserve,
      shifts_attributes: shifts,
    };
    navigation.navigate({
      name: "Home",
    });
    dispatch(createPostAsync(post));
    return true;
  }

  const checkDescriptionForErrors = (newErrors) => {
    if (description === "") {
      newErrors["description"] = "Description required";
    }
  };

  const checkShiftsForErrors = (newErrors) => {
    if (shifts.length === 0) {
      newErrors["shifts"] = "At least one Shift is requried";
    }
    if (shifts.length > 0) {
      let invalidShifts = shifts.filter((shift) =>
        compareAsc(new Date(shift.start), new Date(postEndsDate)) === -1
          ? true
          : false
      );
      setInvalidShiftIds(invalidShifts.map((shift) => shift.tempId));
      if (invalidShifts.length > 0) {
        newErrors["shifts"] = "Shift starts before the post ends";
      }
    }
  };

  const checkPostEndsDateForErrors = (newErrors) => {
    if (!postEndsDateIsValid()) {
      newErrors["postEndsDate"] =
        "Post must be at least half an hour in the future";
    }
  };

  const checkGroupForErrors = (newErrors) => {
    if (groupId === 0) {
      newErrors["group"] = "Need to pick a group";
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

  function postEndsDateIsValid() {
    return compareAsc(new Date(postEndsDate), addMinutes(Date.now(), 30)) === 1
      ? true
      : false;
  }

  return (
    <KeyboardWrapper>
      <View flex="1">
        <CScrollBackground>
          <CContentTile>
            <VStack w="100%">
              <FormControl
                isInvalid={["shifts"].some((error) =>
                  Object.keys(errors).includes(error)
                )}
              >
                <FormControl.Label mb="-1">Group</FormControl.Label>
                <FormControl.ErrorMessage>
                  {errors.group}
                </FormControl.ErrorMessage>
                <Button
                  fontSize="md"
                  fontWeight="400"
                  color="myDarkGrayText"
                  variant="Unstyled"
                  display="flex"
                  justifyContent="flex-start"
                  borderColor={errors["group"] ? "error.600" : "muted.300"}
                  borderWidth="1"
                  p="2"
                  mt="2"
                  mx="1"
                  onPress={() => {
                    navigation.navigate("Your Groups", {
                      initGroupId: groupId,
                    });
                    setErrors({ ...errors, group: null });
                  }}
                >
                  {groupName}
                </Button>

                <FormControl.Label mb="-1">Post Ends</FormControl.Label>
                <FormControl.ErrorMessage>
                  {errors.postEndsDate}
                </FormControl.ErrorMessage>
                <Button
                  fontSize="md"
                  fontWeight="400"
                  color="myDarkGrayText"
                  variant="Unstyled"
                  display="flex"
                  justifyContent="flex-start"
                  borderColor={
                    errors["postEndsDate"] ? "error.600" : "muted.300"
                  }
                  borderWidth="1"
                  p="2"
                  mt="2"
                  mx="1"
                  onPress={() => {
                    navigation.navigate("Time and Date", {
                      initDate: postEndsDate,
                      returnType: "postEndsDate",
                      returnScreen: "Create Post",
                      mode: "Post Ends",
                      helperText:
                        "Set a time for the post to end, stopping people from bidding.",
                    });
                    setErrors({ ...errors, postEndsDate: null });
                  }}
                >
                  {format(new Date(postEndsDate), "p - EEEE do LLL")}
                </Button>

                <FormControl.Label mb="-1">Reserve</FormControl.Label>
                <FormControl.HelperText>
                  {reserve < 0
                    ? "Maximum you are willing to pay"
                    : "Minimum you will accept"}
                </FormControl.HelperText>
                <Button
                  fontSize="md"
                  fontWeight="400"
                  color="myDarkGrayText"
                  variant="Unstyled"
                  display="flex"
                  justifyContent="flex-start"
                  borderColor="muted.300"
                  borderWidth="1"
                  p="2"
                  mt="2"
                  mx="1"
                  onPress={() =>
                    navigation.navigate("Add Reserve", {
                      reserve: reserve,
                      returnScreen: "Create Post",
                    })
                  }
                >
                  <Money microDollars={reserve} color="black" />
                </Button>

                <FormControl.Label mb="-1">Description</FormControl.Label>
                <FormControl.ErrorMessage>
                  {errors.description}
                </FormControl.ErrorMessage>
                <TextArea
                  mt="2"
                  h={20}
                  placeholder="Why are you trying to get rid of your shift?"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.nativeEvent.text);
                    setErrors({ ...errors, description: null });
                  }}
                  isInvalid={errors["description"]}
                />

                {shifts.length > 0 ? (
                  <>
                    <FormControl.Label mb="-1">Shift</FormControl.Label>
                    {errors["shifts"] ? (
                      <FormControl.ErrorMessage>
                        {errors.shifts}
                      </FormControl.ErrorMessage>
                    ) : (
                      <FormControl.HelperText>
                        Time and Position
                      </FormControl.HelperText>
                    )}
                    <Shift
                      shifts={shifts ? shifts : []}
                      navigation={navigation}
                      editable={true}
                      invalidShiftIds={[]}
                    />
                  </>
                ) : (
                  ""
                )}
              </FormControl>
            </VStack>
          </CContentTile>
        </CScrollBackground>
      </View>
      {shifts.length == 0 || errors["shifts"] ? (
        <Button
          variant="myButtonYellowVariant"
          w="100%"
          borderRadius="0"
          onPress={() => {
            navigation.navigate("Add Shift", {
              start: new Date(postEndsDate).toString(),
              end: new Date(postEndsDate).toString(),
              endsAt: new Date(postEndsDate).toString(),
              initPosition: "",
              editingMode: false,
              returnScreen: "Create Post",
            });
            setErrors({ ...errors, shifts: null });
            dispatch(resetShifts());
          }}
        >
          {errors["shifts"] ? "Edit Shift" : "Add Shift"}
        </Button>
      ) : (
        <Button mt="2" variant="myButtonYellowVariant" onPress={onSubmit}>
          Make Post
        </Button>
      )}
    </KeyboardWrapper>
  );
}

export default PostForm;
