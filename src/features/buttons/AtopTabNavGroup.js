import React, { useEffect } from "react";

import { Box, Button, HStack } from "native-base";

function AtopTabNavGroup({ left, right, leftFunction, rightFunction }) {
  return (
    <Box position="absolute" bottom="0" width="100%">
      <HStack>
        <Button
          margin="2"
          borderRadius="9"
          flex="1"
          variant="myButtonYellowVariant"
          onPress={() => leftFunction()}
        >
          {left}
        </Button>
        <Button
          margin="2"
          borderLeftWidth="0"
          borderRadius="9"
          flex="1"
          variant="myButtonYellowVariant"
          onPress={() => rightFunction()}
        >
          {right}
        </Button>
      </HStack>
    </Box>
  );
}

export default AtopTabNavGroup;
