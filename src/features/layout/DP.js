import React from "react";
import CachedImage from "expo-cached-image";
import { Text, Center, Box } from "native-base";

function DP({ uri }) {
  function getImageThumbnail(uri) {
    if (uri !== null) {
      let lastURIsegment = uri.split("/")[uri.split("/").length - 1];
      let lastURIsegmentNoFileType = lastURIsegment.split(".")[0];
      return lastURIsegmentNoFileType;
    }
  }

  return (
    <Box shadow="3" borderRadius="50">
      <CachedImage
        source={{
          uri: uri,
          expiresIn: 2628288,
        }}
        cacheKey={`${getImageThumbnail(uri)}`}
        placeholderContent={<Text>Hello</Text>}
        alt="avatar"
        style={{
          width: 40,
          height: 40,
          resizeMode: "contain",
          borderRadius: 50,
        }}
        resizeMode="cover"
      />
    </Box>
  );
}

export default DP;
