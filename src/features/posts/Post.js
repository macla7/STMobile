import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import Bids from "./bids/Bids.js";
import Shift from "./shifts/Shift.js";
import {
  Box,
  Text,
  Flex,
  HStack,
  VStack,
  Center,
  Button,
  ScrollView,
  Pressable,
} from "native-base";
import { createConsumer } from "@rails/actioncable";
import DP from "../layout/DP";
import { format, formatDistanceToNow } from "date-fns";
import ButtonGroup from "./ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock.js";
import { faLock } from "@fortawesome/free-solid-svg-icons/faLock";
import Comments from "./comments/Comments";
import { domain } from "@env";
import { selectUserId } from "../sessions/sessionSlice.js";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";

global.addEventListener = () => {};
global.removeEventListener = () => {};

const consumer = createConsumer(`ws://${domain}/cable`);

function Post(props) {
  const [bids, setBids] = useState(props.post.bids);
  const [minPrice, setMinPrice] = useState(null);
  const [likes, setLikes] = useState(props.post.likes);
  const [comments, setComments] = useState(props.post.comments);
  const userId = useSelector(selectUserId);

  const postsChannel = useMemo(() => {
    return consumer.subscriptions.create(
      { channel: "PostsChannel", post: props.post.id },
      {
        received(postData) {
          if (postData.type == "Bids") {
            setBids(postData.body.bids);
            setMinPrice(setNewMinimumPrice(postData.body.bids));
          }
          if (postData.type == "Likes") {
            setLikes(postData.body);
          }
          if (postData.type == "Comments") {
            setComments(postData.body.comments);
          }
        },
      }
    );
  });

  useEffect(() => {
    setBids(props.post.bids);
    setLikes(props.post.likes);
    setComments(props.post.comments);
    setMinPrice(setNewMinimumPrice(props.post.bids));
    return () => {
      postsChannel.unsubscribe();
    };
  }, [
    JSON.stringify(props.post.likes),
    JSON.stringify(props.post.bids),
    JSON.stringify(props.post.comments),
  ]);

  function setNewMinimumPrice(bids) {
    if (bids == undefined || bids.length == 0) {
      return props.post.reserve;
    } else {
      return bids[0].price;
    }
  }

  function canSeeSettings(item) {
    if (item.user_id == userId || isUserAdmin(userId)) {
      return true;
    }
    return false;
  }

  function isUserAdmin(userId) {
    let post_admins = props.post.post_admins;
    if (post_admins) {
      // Loop through the post_admins array
      for (let i = 0; i < post_admins.length; i++) {
        // Check if the current user's ID matches the given userId
        if (post_admins[i].id === userId) {
          return true;
        }
      }
    }
    // If no match is found, return false
    return false;
  }

  return (
    <Center my="1" bgColor="white" borderColor="myBorderGray" borderWidth="1">
      <Box width="100%" p="2">
        <HStack width="100%" overflow="hidden">
          {props.post.avatar_url ? (
            <DP uri={`${props.post.avatar_url}`} size={40} />
          ) : (
            ""
          )}
          <Box ml="2" flexGrow={1}>
            <VStack>
              <HStack justifyContent="space-between">
                <Text color="myDarkGrayText" bold>
                  {props.post.postor_name} -{" "}
                  {format(new Date(props.post.created_at), "d MMM")}
                </Text>
                {canSeeSettings(props.post) ? (
                  <Pressable
                    onPress={() => {
                      props.navigation.navigate("Post Settings", {
                        postId: props.post.id,
                        bids: props.post.bids,
                        isUserAdmin: isUserAdmin(userId),
                      });
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      style={{ color: "#4b5563" }}
                    />
                  </Pressable>
                ) : null}
              </HStack>

              <HStack
                justifyContent="space-between"
                alignItems="center"
                overflow="hidden"
              >
                <Box flex={1}>
                  <Text color="myDarkGrayText" fontSize="xs">
                    {props.post.group_name}
                  </Text>
                </Box>
                <HStack alignItems="center">
                  {new Date(props.post.ends_at) > new Date() ? (
                    <FontAwesomeIcon icon={faClock} color="#171717" />
                  ) : (
                    <FontAwesomeIcon icon={faLock} color="#171717" />
                  )}

                  <Text ml="1">
                    {new Date(props.post.ends_at) > new Date()
                      ? "Ends in " +
                        formatDistanceToNow(new Date(props.post.ends_at))
                      : "Ended " +
                        formatDistanceToNow(new Date(props.post.ends_at)) +
                        " ago"}
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </HStack>
      </Box>

      <Flex direction="row">
        <VStack flex={1}>
          <ScrollView maxH="48">
            <Shift
              shifts={props.post.shifts}
              editable={false}
              invalidShiftIds={[]}
            />

            <Box width="100%" px="2" mb="2">
              <Text>{props.post.body}</Text>
            </Box>
          </ScrollView>
        </VStack>
        <Box flex={1}>
          <Bids
            bids={bids}
            ended={new Date(props.post.ends_at) < new Date()}
            postId={props.post.id}
            navigation={props.navigation}
            reserveBid={{
              price: props.post.reserve,
              avatar_url: props.post.avatar_url,
              created_at: props.post.created_at,
              bidder_name: props.post.postor_name,
            }}
          />
        </Box>
      </Flex>

      <Flex
        direction="row"
        justifyContent="space-between"
        h="10"
        w="100%"
        borderTopWidth="1"
        borderColor="myBorderGray"
      >
        <HStack flex="1" justifyContent="flex-start">
          <Center mx="2">
            <Text>{likes.length} Likes</Text>
          </Center>
        </HStack>

        <HStack flex="1" justifyContent="flex-end">
          <Center mx="2">
            <Button
              flex="1"
              variant="unstyled"
              p="0"
              onPress={() => {
                if (props.example) {
                  alert("This is just an example post");
                } else {
                  props.navigation.navigate("Post", {
                    returnScreen: "Home Feed",
                    postId: props.post.id,
                  });
                }
              }}
            >
              <Text>{comments.length} Comments</Text>
            </Button>
          </Center>
          <Center mr="2">
            <Text>{bids.length} Bids</Text>
          </Center>
        </HStack>
      </Flex>

      <ButtonGroup
        ended={new Date(props.post.ends_at) < new Date()}
        minPrice={minPrice}
        postId={props.post.id}
        navigation={props.navigation}
        likes={likes}
        commentRef={props.commentRef}
        singularView={props.singularView}
        example={props.example}
      />

      {props.singularView ? (
        <Comments
          comments={comments}
          canSeeSettings={canSeeSettings}
          navigation={props.navigation}
        />
      ) : null}
    </Center>
  );
}

export default Post;
