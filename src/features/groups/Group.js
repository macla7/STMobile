import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, ScrollView } from "native-base";
import {
  fetchMembershipsAsync,
  selectMemberships,
  isUserAMember,
  isUserAnAdmin,
  selectIsAdmin,
  selectIsMember,
  selectStatus,
  Statuses,
} from "./memberships/membershipSlice";
import { selectPosts, fetchPostsAsync } from "../posts/postSlice";
import Posts from "../posts/Posts";
import { CScrollBackgroundRefresh } from "../layout/LayoutComponents";

// Atm getting user through props so I can have it 'on mount' to determine
// admin status from memberships API. It doesn't seem to work
// if I try and grab from state.
function Group({ route, navigation }) {
  const dispatch = useDispatch();
  const { item } = route.params;
  const [groupDetails, setGroupDetails] = useState(null);
  const status = useSelector(selectStatus);
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPostsAsync(item.id));
  }, [posts.length]);

  useEffect(() => {
    dispatch(fetchMembershipsAsync(item.id));
  }, []);

  function refresh() {
    dispatch(fetchPostsAsync(item.id));
  }

  let contents;
  if (status !== Statuses.UpToDate) {
    contents = <Text>{status}</Text>;
  } else {
    contents = groupDetails;
  }

  return (
    <CScrollBackgroundRefresh refreshAction={() => refresh()}>
      <Button
        colorScheme="indigo"
        onPress={() =>
          navigation.navigate("Create Post", {
            date: Date.now(),
            groupId: item.id,
            groupName: item.name,
            description: "",
            reserve: 0,
            returnScreen: "Group",
          })
        }
        mx="6"
        my="4"
        w="90%"
      >
        Create Post
      </Button>
      <Posts navigation={navigation} posts={posts} />
    </CScrollBackgroundRefresh>
  );
}

export default Group;
