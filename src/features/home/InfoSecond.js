import React, { useState, useEffect } from "react";
import {
  CScrollBackground,
  CWholeSpaceContentTile,
} from "../layout/LayoutComponents";
import { Button, Center, Text, Box, HStack, Spacer } from "native-base";
import Post from "../posts/Post";
import {
  addDays,
  formatISO,
  subDays,
  setHours,
  setMinutes,
  setSeconds,
  subHours,
} from "date-fns";
import { useIsFocused } from "@react-navigation/native";

function InfoSecond({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setIsLoading(false);
    }
  }, [isFocused]);

  const examplePost = JSON.parse(`{
        "id": 0,
        "body": "Got an exam on, someone please help 🙏",
        "user_id": 324,
        "ends_at": "${formatISO(addDays(new Date(), 12))}",
        "created_at": "${formatISO(subDays(new Date(), 2))}",
        "updated_at": "${formatISO(subDays(new Date(), 2))}",
        "group_id": 1,
        "reserve": -20000000,
        "group_name": "Cafe Coffee",
        "postor_name": "Tess Georges",
        "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBck1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--138ea1df8b223ff85a40c3146918b5570514c9cf/profilePictureUser421.jpg",
        "shifts": [
            {
                "id": 4,
                "position": "Barista",
                "start": "${formatISO(
                  setSeconds(
                    setMinutes(setHours(addDays(new Date(), 19), 9), 0),
                    0
                  )
                )}",
                "end": "${formatISO(
                  setSeconds(
                    setMinutes(setHours(addDays(new Date(), 19), 15), 0),
                    0
                  )
                )}",
                "post_id": 4,
                "created_at": "2023-07-15T07:33:10.640Z",
                "updated_at": "2023-07-15T07:33:10.640Z"
            }
        ],
        "likes": [
            {
                "id": 27,
                "post_id": 4,
                "user_id": 402,
                "created_at": "2023-07-15T08:32:44.012Z",
                "updated_at": "2023-07-15T08:32:44.012Z"
            }
        ],
        "comments": [
            {
                "id": 1,
                "post_id": 4,
                "user_id": 1,
                "body": "Would love too!",
                "created_at": "${formatISO(subDays(new Date(), 2))}",
                "updated_at": "${formatISO(subDays(new Date(), 2))}",
                "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBckVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c2e88df50446700c2152f5f38f15ba4ba1801376/profilePictureUser420.jpg",
                "commentor_name": "Fred Smith"
            }
        ],
        "bids": [
            {
                "id": 16,
                "post_id": 4,
                "user_id": 402,
                "price": 10000000,
                "created_at": "${formatISO(subHours(new Date(), 2))}",
                "updated_at": "${formatISO(subHours(new Date(), 2))}",
                "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2e9f2a9b0046539f89ac6ee560ba1ad155a5643b/profilePictureUser418.jpg",
                "bidder_name": "Bob Clark"
            },
            {
                "id": 11,
                "post_id": 4,
                "user_id": 2,
                "price": 5000000,
                "created_at": "${formatISO(subDays(new Date(), 1))}",
                "updated_at": "${formatISO(subDays(new Date(), 1))}",
                "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcThCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e4a4a8d088c06790dc942d862602a44343f47a22/profilePictureUser419.jpg",
                "bidder_name": "Amy Chen"
            },
            {
                "id": 10,
                "post_id": 4,
                "user_id": 1,
                "price": -10000000,
                "created_at": "${formatISO(subDays(new Date(), 2))}",
                "updated_at": "${formatISO(subDays(new Date(), 2))}",
                "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBckVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c2e88df50446700c2152f5f38f15ba4ba1801376/profilePictureUser420.jpg",
                "bidder_name": "Fred Smith"
            }
        ]
    }`);

  return (
    <CScrollBackground>
      <CWholeSpaceContentTile>
        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>
              This is an example Post. Here you can see that Tess is trying to
              get her 9am Barista shift at 'Cafe Coffee' covered
            </Text>
          </HStack>
        </Box>

        <Box borderRadius="6" p="4" w="90%" mb="2" mx="1" bgColor="white">
          <HStack alignItems="center">
            <Text>You can bid for this shift for the next 12 days</Text>
          </HStack>
        </Box>

        <Center w="100%">
          <Post
            post={examplePost}
            key={examplePost.id}
            navigation={navigation}
            singularView={false}
            example={true}
          />
        </Center>

        {isLoading ? <Text>Loading...</Text> : null}
        <HStack w="90%">
          <Button
            variant="myButtonYellowVariant"
            onPress={() => {
              setIsLoading(true);
              navigation.navigate("Info");
            }}
            flex="1"
            borderRadius="6"
            mb="6"
            mt="2"
          >
            Back
          </Button>
          <Spacer />
          <Button
            variant="myButtonYellowVariant"
            onPress={() => {
              setIsLoading(true);
              navigation.navigate("InfoThird");
            }}
            flex="1"
            borderRadius="6"
            mb="6"
            mt="2"
          >
            Next
          </Button>
        </HStack>
        <Text>Page 2 of 3</Text>
      </CWholeSpaceContentTile>
    </CScrollBackground>
  );
}

export default InfoSecond;
