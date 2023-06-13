import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Box } from "native-base";
import { CBackground } from "../layout/LayoutComponents";
import Post from "./Post";
import { selectPost, fetchPostAsync } from "./postSlice";
import CommentForm from "./comments/CommentForm";
import KeyboardWrapper from "../layout/KeyboardWrapper";

function PostScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const { returnScreen, postId } = route.params;
  const ref_input = useRef();

  useEffect(() => {
    dispatch(fetchPostAsync(postId));
  }, []);

  return (
    <KeyboardWrapper>
      <CBackground>
        <ScrollView w="100%" contentContainerStyle={{ flexGrow: 1 }} shadow="6">
          <Post
            post={post}
            navigation={navigation}
            singularView={true}
            commentRef={ref_input}
          />
        </ScrollView>
      </CBackground>
      <Box>
        <CommentForm postId={post.id} commentRef={ref_input} />
      </Box>
    </KeyboardWrapper>
  );
}

export default PostScreen;
