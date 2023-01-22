import { getValueFor } from "../../sessions/sessionAPI.js";

const API_URL = "http://192.168.68.229:3000/api/v1";

export async function fetchComments(postId) {
  return fetch(`${API_URL}/posts/${postId}/comments.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.auth_token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}

export async function createComment(commentDetails) {
  const auth_token = await getValueFor("auth_token");
  return fetch(`${API_URL}/comments.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({ comment: commentDetails }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}
