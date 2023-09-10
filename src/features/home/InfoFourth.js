import React, { useState, useEffect } from "react";
import {
  CScrollBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import Bid from "../posts/bids/Bid";
import { Button, Center, Text, Box, HStack, Flex, Spacer } from "native-base";
import { formatISO, subDays } from "date-fns";
import { useIsFocused } from "@react-navigation/native";
import HomeIcon from "../../assets/noun-home-5222306-676767.svg";
import GroupsIcon from "../../assets/noun-group-1175010-676767.svg";
import NotificationsIcon from "../../assets/noun-notification-1439229-676767.svg";
import ProfileIcon from "../../assets/noun-profile-1307600-676767 (1).svg";
import { AddIcon } from "native-base";

function InfoFourth({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

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
            <Text>Make, join or view Group details</Text>
          </HStack>
        </Box>

        <Center my="1">
          <Flex direction="row">
            <Spacer />
            <GroupsIcon width="40" height="40" fill="#4243ed" />
            <Spacer />
          </Flex>
        </Center>

        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>Create a Post</Text>
          </HStack>
        </Box>

        <Center my="1">
          <Flex direction="row">
            <Spacer />
            <AddIcon size="xl" color="#4243ed" />
            <Spacer />
          </Flex>
        </Center>

        <Center my="1">
          {isLoading ? <Text>Loading...</Text> : null}
          <HStack w="90%">
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
              Back
            </Button>
            <Spacer />
            <Spacer />
          </HStack>
          <Text>Page 4 of 4</Text>
        </Center>
      </CWholeSpaceContentTile>
    </CScrollBackground>
  );
}

export default InfoFourth;
