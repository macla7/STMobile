import React, { useEffect } from "react";
import { selectIsLoggedIn } from "../sessions/sessionSlice";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../posts/Posts";
import { selectHomePosts, fetchPostsHomeAsync } from "../posts/postSlice";
import { Button } from "native-base";
import { CScrollBackgroundRefresh } from "../layout/LayoutComponents";

function Home({ navigation }) {
  const homePosts = useSelector(selectHomePosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPostsHomeAsync());
  }, [homePosts.length]);

  function refresh() {
    dispatch(fetchPostsHomeAsync());
  }

  return (
    <CScrollBackgroundRefresh refreshAction={() => refresh()}>
      <Button
        colorScheme="indigo"
        onPress={() =>
          navigation.navigate("Create Post", {
            date: Date.now(),
            groupId: 0,
            groupName: "Group Not Selected..",
            description: "",
            reserve: 0,
            returnScreen: "Home Feed",
          })
        }
        mx="2"
        mt="2"
        mb="1"
      >
        Create Post
      </Button>
      <Posts navigation={navigation} posts={homePosts} />
    </CScrollBackgroundRefresh>
  );
}

export default Home;
