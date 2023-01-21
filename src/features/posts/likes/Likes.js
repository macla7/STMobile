import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLikeAsync, destroyLikeAsync } from "../postSlice";
import { createNotificationBlueprint } from "../../notifications/notificationBlueprintAPI";
import { Button, Text, HStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons/faHeart";

function Likes(props) {
  const [currentUserLiked, setCurrentUserLiked] = useState(false);
  const userId = useSelector((state) => state.sessions.user.id);
  const dispatch = useDispatch();

  let likeDetails = {
    post_id: props.postId,
    user_id: userId,
  };

  function action(e) {
    e.preventDefault();
    if (!currentUserLiked) {
      likePost();
    } else {
      unlikePost();
    }
  }

  function likePost() {
    setCurrentUserLiked(true);
    dispatch(createLikeAsync(likeDetails));
    createNotification();
  }

  function unlikePost() {
    setCurrentUserLiked(false);
    dispatch(destroyLikeAsync(likeDetails));
  }

  function createNotification() {
    let notification_blueprint = {
      notificationable_type: "Post",
      notificationable_id: props.postId,
      notification_type: 7,
    };
    createNotificationBlueprint(notification_blueprint);
  }

  // Fetch Likes
  useEffect(() => {
    hasCurrentUserLiked();
  }, [dispatch, JSON.stringify(props.likes)]);

  function hasCurrentUserLiked() {
    if (props.likes.filter((like) => like.user_id === userId).length > 0) {
      setCurrentUserLiked(true);
    } else {
      setCurrentUserLiked(false);
    }
  }

  return (
    <Button
      flex="1"
      variant="unstyled"
      p="0"
      onPress={(e) => action(e)}
      borderColor=""
    >
      <HStack h="100%" alignItems="center">
        {currentUserLiked ? (
          <FontAwesomeIcon icon={faHeartSolid} color="red" />
        ) : (
          <FontAwesomeIcon icon={faHeartRegular} color="#171717" />
        )}

        <Text mx="2">Like</Text>
      </HStack>
    </Button>
  );
}

export default Likes;
