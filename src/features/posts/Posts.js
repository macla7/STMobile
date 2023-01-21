import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts, selectStatus } from "../posts/postSlice";
import Post from "../posts/Post";

function Posts(props) {
  return (
    <>
      {props.posts.map((item) => {
        return (
          <Post
            post={item}
            key={item.id}
            navigation={props.navigation}
            singularView={false}
          />
        );
      })}
    </>
  );
}

export default Posts;
