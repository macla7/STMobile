import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "native-base";
import { CBackground } from "../layout/LayoutComponents";
import Post from "./Post";
import { selectPost, fetchPostAsync } from "./postSlice";
import CommentForm from "./comments/CommentForm";

function PostScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const { returnScreen, postId } = route.params;
  const ref_input = useRef();

  useEffect(() => {
    dispatch(fetchPostAsync(postId));
  }, []);

  return (
    <CBackground>
      <ScrollView
        w="100%"
        contentContainerStyle={{ flexGrow: 1 }}
        shadow="6"
        mb="12"
      >
        <Post
          post={post}
          navigation={navigation}
          singularView={true}
          commentRef={ref_input}
        />
      </ScrollView>
      <CommentForm postId={post.id} commentRef={ref_input} />
    </CBackground>
  );
}

export default PostScreen;
