import React, { useState, useCallback } from "react";
import { Center, Box, HStack } from "native-base";
import { RefreshControl, ScrollView } from "react-native";

export function CBackground({ children }) {
  return (
    <Center w="100%" flex={1}>
      <Box bgColor="myBackgroundGray" width="100%" flex={1}>
        <Box w="100%" flex={1}>
          {children}
        </Box>
      </Box>
    </Center>
  );
}

export function CScrollBackground({ children }) {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      minHeight="100%"
      w="100%"
    >
      <Box bgColor="myBackgroundGray" width="100%" flex={1}>
        <Box w="100%" flex={1}>
          {children}
        </Box>
      </Box>
    </ScrollView>
  );
}

export function CScrollBackgroundRefresh({ children, refreshAction }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
    refreshAction();
  }, []);

  return (
    <ScrollView
      w="100%"
      minHeight="100%"
      style={{ backgroundColor: "#f5f5f5" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Box bgColor="myBackgroundGray" width="100%" minHeight="100%">
        <Box p="0" w="100%" minHeight="100%">
          {children}
        </Box>
      </Box>
    </ScrollView>
  );
}

export function CContentTile({ children }) {
  return (
    <Center my="1">
      <HStack>
        <Center flex="1" p="4" bgColor="white">
          {children}
        </Center>
      </HStack>
    </Center>
  );
}

export function CWholeSpaceContentTile({ children }) {
  return (
    <Center w="100%" h="100%">
      {children}
    </Center>
  );
}

export function CWholeSpaceRefreshTile({ children, refreshAction }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
    refreshAction();
  }, []);

  return (
    <Box w="100%" h="100%" bgColor="white">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Center>{children}</Center>
      </ScrollView>
    </Box>
  );
}

export function CInternalBorderTile({ children, borderColor }) {
  return (
    <Box p="1" mb="1" mx="1">
      {children}
    </Box>
  );
}
