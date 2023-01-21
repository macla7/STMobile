import React, { useEffect } from "react";
import { destroyPostAsync } from "./postSlice";
import { Text, Flex, HStack, Button, AspectRatio, Box } from "native-base";
import Likes from "./likes/Likes";
import BidIcon from "../../assets/noun-auction-4831153.svg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMessage } from "@fortawesome/free-regular-svg-icons/faMessage";

function ButtonGroup({
  postId,
  minPrice,
  navigation,
  likes,
  commentRef,
  singularView,
}) {
  function handleClick(e) {
    const payload = {
      post: {
        post_id: props.post_id,
      },
    };
    props.dispatch(destroyPostAsync(payload));
  }

  useEffect(() => {
    if (singularView) {
      commentRef.current.focus();
    }
  }, []);

  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      h="10"
      borderTopWidth="1"
      borderColor="coolGray.200"
    >
      <Likes likes={likes} postId={postId} />

      <Button
        flex="1"
        variant="unstyled"
        p="0"
        onPress={() => {
          navigation.navigate("Post", {
            returnScreen: "Home Feed",
            postId: postId,
          });
          if (singularView) {
            commentRef.current.focus();
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
        onPress={() =>
          navigation.navigate("Bid", {
            reserve: minPrice,
            returnScreen: "Home Feed",
            postId: postId,
          })
        }
      >
        <HStack h="100%" alignItems="center">
          <Box>
            <AspectRatio ratio={{ base: 1 / 1, md: 1 / 1 }} h="100%">
              <BidIcon width="100%" height="100%" fill="#047857" />
            </AspectRatio>
          </Box>
          {/* <FontAwesomeIcon icon={faSackDollar} color="#047857" /> */}
          <Text ml="-2" mr="3">
            Bid
          </Text>
        </HStack>
      </Button>
    </Flex>
  );
}

export default ButtonGroup;
