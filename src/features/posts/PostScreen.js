import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Box, View } from "native-base";
import { CBackground } from "../layout/LayoutComponents";
import Post from "./Post";
import { selectPost, fetchPostAsync } from "./postSlice";
import CommentForm from "./comments/CommentForm";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

function PostScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const post = useSelector(selectPost);
  const { returnScreen, postId } = route.params;
  const ref_input = useRef();
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    dispatch(fetchPostAsync(postId));
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>
          <View pt={headerHeight + "px"} h="100%">
            <CBackground>
              <ScrollView
                w="100%"
                contentContainerStyle={{ flexGrow: 1 }}
                shadow="6"
              >
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
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default PostScreen;
