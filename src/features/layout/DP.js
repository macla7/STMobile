import React from "react";
import CachedImage from "expo-cached-image";
import { Text, Box } from "native-base";

function DP({ uri, size }) {
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
        placeholderContent={<Text>...</Text>}
        alt="avatar"
        style={{
          width: size,
          height: size,
          resizeMode: "contain",
          borderRadius: 100,
        }}
        resizeMode="cover"
      />
    </Box>
  );
}

export default DP;
