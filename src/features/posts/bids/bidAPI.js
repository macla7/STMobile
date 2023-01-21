import { getValueFor } from "../../sessions/sessionAPI.js";

const API_URL = "http://192.168.1.48:3000/api/v1";

export async function fetchBids(postId) {
  const auth_token = await getValueFor("auth_token");
  return fetch(`${API_URL}/posts/${postId}/bids.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}

export async function createBid(bidDetails) {
  const auth_token = await getValueFor("auth_token");
  return fetch(`${API_URL}/bids.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth_token}`,
    },
    body: JSON.stringify({ bid: bidDetails }),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}
