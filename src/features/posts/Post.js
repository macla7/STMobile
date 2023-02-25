import React, { useEffect, useState, useMemo } from "react";
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
} from "native-base";
import { createConsumer } from "@rails/actioncable";
import DP from "../layout/DP";
import { format, formatDistanceToNow } from "date-fns";
import ButtonGroup from "./ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons/faClock";
import Comments from "./comments/Comments";
import { domain } from "@env";

global.addEventListener = () => {};
global.removeEventListener = () => {};

const consumer = createConsumer(`ws://${domain}/cable`);

function Post(props) {
  const [bids, setBids] = useState(props.post.bids);
  const [minPrice, setMinPrice] = useState(null);
  const [likes, setLikes] = useState(props.post.likes);
  const [comments, setComments] = useState(props.post.comments);

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

  // setLike and setBids needed here as this is as the component is first rendered
  // with the props.post.. but then on re-render (due to the things in the
  // useEffect array), it needs to set bids and likes again.
  useEffect(() => {
    setBids(props.post.bids);
    setLikes(props.post.likes);
    setComments(props.post.comments);
    setMinPrice(setNewMinimumPrice(props.post.bids));
    return () => {
      postsChannel.unsubscribe();
    };
  }, [JSON.stringify(props.post.likes), JSON.stringify(props.post.bids)]);

  function setNewMinimumPrice(bids) {
    if (bids == undefined || bids.length == 0) {
      return props.post.reserve;
    } else {
      return bids[0].price;
    }
  }

  return (
    <Center my="1" bgColor="white">
      <Center width="100%" px="2" py="1">
        <Text
          _dark={{
            color: "warmGray.50",
          }}
          color="coolGray.800"
          bold
        >
          {props.post.group_name}
        </Text>
      </Center>
      <Box width="100%" p="2">
        <HStack width="100%">
          {props.post.avatar_url ? <DP uri={`${props.post.avatar_url}`} /> : ""}
          <Box ml="2" flexGrow={1}>
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
              >
                {props.post.postor_name}
              </Text>
              <HStack justifyContent="space-between">
                <Text>{format(new Date(props.post.created_at), "d MMM")}</Text>
                <HStack alignItems="center">
                  <FontAwesomeIcon icon={faClock} color="#171717" />
                  <Text ml="1">
                    Ends in {formatDistanceToNow(new Date(props.post.ends_at))}
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
            <Box width="100%" px="2" mb="2">
              <Text>{props.post.body}</Text>
            </Box>

            <Shift
              shifts={props.post.shifts}
              editable={false}
              invalidShiftIds={[]}
            />
          </ScrollView>
        </VStack>
        <Box flex={1}>
          <Box>
            <Bids
              bids={bids}
              postId={props.post.id}
              navigation={props.navigation}
              reserveBid={{
                price: props.post.reserve,
                avatar_url: props.post.avatar_url,
                created_at: props.post.created_at,
                bidder: props.post.postor_name,
              }}
            />
          </Box>
        </Box>
      </Flex>

      <Flex
        direction="row"
        justifyContent="space-between"
        h="10"
        w="100%"
        borderTopWidth="1"
        borderColor="coolGray.200"
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
              onPress={() =>
                props.navigation.navigate("Post", {
                  returnScreen: "Home Feed",
                  postId: props.post.id,
                })
              }
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
        minPrice={minPrice}
        postId={props.post.id}
        navigation={props.navigation}
        likes={likes}
        commentRef={props.commentRef}
        singularView={props.singularView}
      />

      {props.singularView ? <Comments comments={comments} /> : null}
    </Center>
  );
}

export default Post;
