import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Posts from "../posts/Posts";
import {
  selectHomePosts,
  fetchPostsHomeAsync,
  selectStatus,
} from "../posts/postSlice";
import { CScrollBackgroundRefresh } from "../layout/LayoutComponents";
import { Button, Center, Heading } from "native-base";
import Post from "../posts/Post";
import {
  addDays,
  formatISO,
  subDays,
  setHours,
  setMinutes,
  setSeconds,
  subHours,
} from "date-fns";
import { selectNewUser } from "../sessions/sessionSlice";

function Home({ navigation }) {
  const homePosts = useSelector(selectHomePosts);
  const dispatch = useDispatch();
  const newUser = useSelector(selectNewUser);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      newUserFlow();
      refresh(); // Call the function when the screen is focused (navigated to)
    });
    return () => {
      unsubscribe(); // Clean up the listener when the component is unmounted (navigated away)
    };
  }, [newUser]);

  function refresh() {
    dispatch(fetchPostsHomeAsync());
  }

  function newUserFlow() {
    if (newUser) {
      navigation.navigate("InfoStackScreen");
    }
  }

  const examplePost = JSON.parse(`{
        "id": 0,
        "body": "Got an exam on, someone please help 🙏",
        "user_id": 324,
        "ends_at": "${formatISO(addDays(new Date(), 12))}",
        "created_at": "${formatISO(subDays(new Date(), 2))}",
        "updated_at": "${formatISO(subDays(new Date(), 2))}",
        "group_id": 1,
        "reserve": -20000000,
        "group_name": "Cafe Coffee",
        "postor_name": "Tess Georges",
        "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBck1CIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--138ea1df8b223ff85a40c3146918b5570514c9cf/profilePictureUser421.jpg",
        "shifts": [
            {
                "id": 4,
                "position": "Barista",
                "start": "${formatISO(
                  setSeconds(
                    setMinutes(setHours(addDays(new Date(), 19), 9), 0),
                    0
                  )
                )}",
                "end": "${formatISO(
                  setSeconds(
                    setMinutes(setHours(addDays(new Date(), 19), 15), 0),
                    0
                  )
                )}",
                "post_id": 4,
                "created_at": "2023-07-15T07:33:10.640Z",
                "updated_at": "2023-07-15T07:33:10.640Z"
            }
        ],
        "likes": [
            {
                "id": 27,
                "post_id": 4,
                "user_id": 402,
                "created_at": "2023-07-15T08:32:44.012Z",
                "updated_at": "2023-07-15T08:32:44.012Z"
            }
        ],
        "comments": [
            {
                "id": 1,
                "post_id": 4,
                "user_id": 1,
                "body": "Would love too!",
                "created_at": "${formatISO(subDays(new Date(), 2))}",
                "updated_at": "${formatISO(subDays(new Date(), 2))}",
                "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBckVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c2e88df50446700c2152f5f38f15ba4ba1801376/profilePictureUser420.jpg",
                "commentor_name": "Fred Smith"
            }
        ],
        "bids": [
            {
                "id": 16,
                "post_id": 4,
                "user_id": 402,
                "price": 10000000,
                "created_at": "${formatISO(subHours(new Date(), 2))}",
                "updated_at": "${formatISO(subHours(new Date(), 2))}",
                "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTBCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2e9f2a9b0046539f89ac6ee560ba1ad155a5643b/profilePictureUser418.jpg",
                "bidder_name": "Bob Clark"
            },
            {
                "id": 11,
                "post_id": 4,
                "user_id": 2,
                "price": 5000000,
                "created_at": "${formatISO(subDays(new Date(), 1))}",
                "updated_at": "${formatISO(subDays(new Date(), 1))}",
                "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcThCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e4a4a8d088c06790dc942d862602a44343f47a22/profilePictureUser419.jpg",
                "bidder_name": "Amy Chen"
            },
            {
                "id": 10,
                "post_id": 4,
                "user_id": 1,
                "price": -10000000,
                "created_at": "${formatISO(subDays(new Date(), 2))}",
                "updated_at": "${formatISO(subDays(new Date(), 2))}",
                "avatar_url": "https://shiftmarket.herokuapp.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBckVCIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--c2e88df50446700c2152f5f38f15ba4ba1801376/profilePictureUser420.jpg",
                "bidder_name": "Fred Smith"
            }
        ]
    }`);

  return (
    <CScrollBackgroundRefresh refreshAction={refresh}>
      {homePosts.length == 0 ? (
        <Center w="100%">
          {/* <Heading pt="1" size="sm">
            Example Post
          </Heading> */}
          <Post
            post={examplePost}
            key={examplePost.id}
            navigation={navigation}
            singularView={false}
            example={true}
          />
          <Button
            width="80%"
            m="4"
            variant="myButtonYellowVariant"
            onPress={() => {
              navigation.navigate("Create", {
                screen: "Create Post",
              });
            }}
          >
            Post a Shift
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
                screen: "Discover",
                initial: false,
              });
            }}
          >
            Join a Group
          </Button>
          <Button
            width="80%"
            m="4"
            fontSize="md"
            color="myDarkGrayText"
            variant="myButtonYellowVariant"
            onPress={() => {
              navigation.navigate("InfoStackScreen", {
                title: "Info",
              });
            }}
          >
            How it works
          </Button>
        </Center>
      ) : (
        <Posts navigation={navigation} posts={homePosts} />
      )}
    </CScrollBackgroundRefresh>
  );
}

export default Home;
