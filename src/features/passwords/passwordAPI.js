import * as SecureStore from "expo-secure-store";
import { REGULAR_URL } from "@env";

export async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

export async function getResetPasswordInstructions(payload) {
  return fetch(`${REGULAR_URL}/users/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then(async (response) => response.json())
    .catch((error) => {
      console.log("Error: ", error);
      // Not a longer term proper soloution
      return {};
    });
}
