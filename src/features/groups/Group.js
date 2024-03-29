import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Text, View, HStack } from "native-base";
import { selectStatus, Statuses } from "./memberships/membershipSlice";
import { selectPosts, fetchPostsAsync } from "../posts/postSlice";
import Posts from "../posts/Posts";
import { CScrollBackgroundRefresh } from "../layout/LayoutComponents";

// Atm getting user through props so I can have it 'on mount' to determine
// admin status from memberships API. It doesn't seem to work
// if I try and grab from state.
function Group({ route, navigation }) {
  const dispatch = useDispatch();
  const { group } = route.params;
  const [groupDetails, setGroupDetails] = useState(null);
  const status = useSelector(selectStatus);
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPostsAsync(group.id));
  }, [posts.length]);

  function refresh() {
    dispatch(fetchPostsAsync(group.id));
  }

  let contents;
  if (status !== Statuses.UpToDate) {
    contents = <Text>{status}</Text>;
  } else {
    contents = groupDetails;
  }

  return (
    <View h="100%">
      <View flex={1}>
        <CScrollBackgroundRefresh refreshAction={() => refresh()}>
          <Posts navigation={navigation} posts={posts} />
        </CScrollBackgroundRefresh>
      </View>
      <HStack>
        <Button
          variant="myButtonYellowVariant"
          onPress={() =>
            navigation.navigate("GroupInfo", {
              group: route.params.group,
            })
          }
          borderRadius="9"
          margin="2"
          flex="1"
        >
          Group Members
        </Button>
      </HStack>
    </View>
  );
}

export default Group;
