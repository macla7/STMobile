import React, { useState, useCallback } from "react";
import { Center, Box, Text, HStack } from "native-base";
import { RefreshControl, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function CBackground({ children }) {
  return (
    <Center w="100%" h="100%">
      <Box bgColor="myBackgroundGray" width="100%" flex={1}>
        <Box w="100%" h="100%">
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
        <Center w="100%" py="1" flex={1}>
          {children}
        </Center>
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
    <Center my="1" h="100%">
      <HStack>
        <Center flex="1" p="4" bgColor="white" shadow="6">
          {children}
        </Center>
      </HStack>
    </Center>
  );
}

export function CWholeSpaceContentTile({ children }) {
  return (
    <Center w="100%" h="100%" shadow="6">
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
    <Box w="100%" h="100%" bgColor="white" shadow="6">
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
    <Box
      borderColor={borderColor}
      borderBottomWidth="1"
      p="1"
      mb="1"
      mx="1"
      bgColor="white"
    >
      {children}
    </Box>
  );
}

export function CInternalBorderHeaderTile({ children }) {
  return (
    <Center
      borderWidth="1"
      borderColor="myBorderGray"
      my="2"
      mx="1"
      bgColor="white"
      shadow="1"
    >
      {children}
    </Center>
  );
}
