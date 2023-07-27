import React from "react";
import { Text, Box, HStack, Center, Flex, Spacer } from "native-base";
import {
  CBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import Bid from "../posts/bids/Bid";
import { formatISO, subDays } from "date-fns";

function Info() {
  return (
    <CBackground>
      <CWholeSpaceContentTile>
        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>Welcome to Shift It.</Text>
          </HStack>
        </Box>

        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>
              We provide a marketplace for you to auction away your shifts,
              meaning you can get rid of your shifts easier and quicker.
            </Text>
          </HStack>
        </Box>

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
            <Spacer />
          </Flex>
        </Center>

        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>Or they can ask to be paid, like this</Text>
          </HStack>
        </Box>

        <Center my="1">
          <Flex direction="row">
            <Spacer />
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
            <Spacer />
          </Flex>
        </Center>
      </CWholeSpaceContentTile>
    </CBackground>
  );
}

export default Info;
