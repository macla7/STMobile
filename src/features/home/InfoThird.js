import React, { useState, useEffect } from "react";
import {
  CScrollBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import Bid from "../posts/bids/Bid";
import { Button, Center, Text, Box, HStack, Flex, Spacer } from "native-base";
import { formatISO, subDays } from "date-fns";
import { useIsFocused } from "@react-navigation/native";

function InfoThird({ navigation }) {
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
            <Text>
              When someone bids on your shift, they can offer to pay, like this
            </Text>
          </HStack>
        </Box>

        <Center my="1">
          <Flex direction="row">
            <Spacer />
            <Box flex="2">
              <Bid
                bid={{
                  id: 11,
                  post_id: 4,
                  user_id: 2,
                  price: 5000000,
                  created_at: formatISO(subDays(new Date(), 1)),
                  updated_at: formatISO(subDays(new Date(), 1)),
                  avatar_url:
                    "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcThCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e4a4a8d088c06790dc942d862602a44343f47a22/profilePictureUser419.jpg",
                  bidder_name: "Amy Chen",
                }}
                reserve={false}
              />
            </Box>
            <Spacer />
          </Flex>
        </Center>

        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>Offer to do cover it for free</Text>
          </HStack>
        </Box>

        <Center my="1">
          <Flex direction="row">
            <Spacer />
            <Box flex="2">
              <Bid
                bid={{
                  id: 11,
                  post_id: 4,
                  user_id: 324,
                  price: 0,
                  created_at: formatISO(subDays(new Date(), 1)),
                  updated_at: formatISO(subDays(new Date(), 1)),
                  avatar_url:
                    "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBck1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--138ea1df8b223ff85a40c3146918b5570514c9cf/profilePictureUser421.jpg",
                  bidder_name: "Tess Georges",
                }}
                reserve={false}
              />
            </Box>
            <Spacer />
          </Flex>
        </Center>

        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>Or they can ask to be paid</Text>
          </HStack>
        </Box>

        <Center my="1">
          <Flex direction="row">
            <Spacer />
            <Box flex="2">
              <Bid
                bid={{
                  id: 10,
                  post_id: 4,
                  user_id: 1,
                  price: -10000000,
                  created_at: formatISO(subDays(new Date(), 2)),
                  updated_at: formatISO(subDays(new Date(), 2)),
                  avatar_url:
                    "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBckVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c2e88df50446700c2152f5f38f15ba4ba1801376/profilePictureUser420.jpg",
                  bidder_name: "Fred Smith",
                }}
                reserve={false}
              />
            </Box>
            <Spacer />
          </Flex>

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
          <Text>Page 3 of 3</Text>
        </Center>
      </CWholeSpaceContentTile>
    </CScrollBackground>
  );
}

export default InfoThird;
