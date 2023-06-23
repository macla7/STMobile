import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../posts/Posts";
import { selectHomePosts, fetchPostsHomeAsync } from "../posts/postSlice";
import { CScrollBackgroundRefresh } from "../layout/LayoutComponents";
import { Button, Center } from "native-base";
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
      {homePosts.length == 0 ? (
        <Center w="100%" h="100%">
          <Button
            width="80%"
            m="4"
            fontSize="md"
            fontWeight="400"
            color="myDarkGrayText"
            variant="myButtonYellowVariant"
            onPress={() => {
              navigation.navigate("Create", { screen: "Create Post" });
            }}
          >
            Create a Post
          </Button>
          <Button
            width="80%"
            m="4"
            fontSize="md"
            fontWeight="400"
            color="myDarkGrayText"
            variant="myButtonYellowVariant"
            onPress={() => {
              navigation.navigate("Groups", {
                screen: "Create Group",
                params: {
                  returnScreen: "Home",
                },
              });
            }}
          >
            Make a Group
          </Button>
          <Button
            width="80%"
            m="4"
            fontSize="md"
            fontWeight="400"
            color="myDarkGrayText"
            variant="myButtonYellowVariant"
            onPress={() => {
              navigation.navigate("Groups", { screen: "Discover" });
            }}
          >
            Join a Group
          </Button>
        </Center>
      ) : (
        <Posts navigation={navigation} posts={homePosts} />
      )}
    </CScrollBackgroundRefresh>
  );
}

export default Home;
