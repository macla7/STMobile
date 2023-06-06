import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../posts/Posts";
import { selectHomePosts, fetchPostsHomeAsync } from "../posts/postSlice";
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
      <Posts navigation={navigation} posts={homePosts} />
    </CScrollBackgroundRefresh>
  );
}

export default Home;
