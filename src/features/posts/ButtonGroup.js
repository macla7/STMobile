import React, { useEffect } from "react";
import { Text, Flex, HStack, Button, AspectRatio, Box } from "native-base";
import { Pressable, Share } from "react-native";
import Likes from "./likes/Likes";
import BidIcon from "../../assets/noun-auction-4831153.svg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons/faMessage";
import * as Linking from "expo-linking";
import { faShareFromSquare } from "@fortawesome/free-regular-svg-icons/faShareFromSquare";

function ButtonGroup({
  ended,
  postId,
  minPrice,
  navigation,
  likes,
  commentRef,
  singularView,
  example,
}) {
  useEffect(() => {
    if (singularView) {
      commentRef.current.focus();
    }
  }, []);

  const redirectUrl = Linking.useURL();

  const onShare = async () => {
    try {
      const result = await Share.share({
        url: "http://localhost:3001/post/1",
        message: "Howdy from shift it",
        title: "Bingo title",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      h="10"
      borderTopWidth="1"
      borderColor="myBorderGray"
    >
      <Button flex="1" variant="unstyled" p="0" onPress={onShare}>
        <HStack h="100%" alignItems="center">
          <FontAwesomeIcon icon={faShareFromSquare} color="#171717" />
          <Text mx="2">Share</Text>
        </HStack>
      </Button>

      <Button
        flex="1"
        variant="unstyled"
        p="0"
        onPress={() => {
          if (example) {
            alert("This is just an example post");
          } else {
            navigation.navigate("Post", {
              returnScreen: "Home Feed",
              postId: postId,
            });
            if (singularView) {
              commentRef.current.focus();
            }
          }
        }}
      >
        <HStack h="100%" alignItems="center">
          <FontAwesomeIcon icon={faMessage} color="#171717" />
          <Text mx="2">Comment</Text>
        </HStack>
      </Button>

      <Button
        flex="1"
        variant="unstyled"
        p="0"
        opacity={ended ? "0.5" : "1"}
        onPress={() => {
          if (example) {
            alert("This is just an example post");
          } else {
            if (ended) {
              alert("This post has ended, no more bidding can take place.");
            } else {
              navigation.navigate("Bid", {
                reserve: minPrice,
                returnScreen: "Home Feed",
                postId: postId,
              });
            }
          }
        }}
      >
        <HStack h="100%" alignItems="center">
          <Box>
            <AspectRatio ratio={{ base: 1 / 1, md: 1 / 1 }} h="100%">
              <BidIcon width="100%" height="100%" fill="#171717" />
            </AspectRatio>
          </Box>
          <Text ml="-2" mr="3">
            Bid
          </Text>
        </HStack>
      </Button>
    </Flex>
  );
}

export default ButtonGroup;
