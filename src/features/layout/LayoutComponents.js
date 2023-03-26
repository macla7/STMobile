import React, { useState, useCallback } from "react";
import { Center, Box, Text } from "native-base";
import { RefreshControl, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export function CBackground({ children }) {
  return (
    <Center w="100%" h="100%">
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#064e3b", "#064e3b", "#065f46", "#047857"]}
        width="100%"
        height="100%"
      >
        <Box w="100%" h="100%">
          {children}
        </Box>
      </LinearGradient>
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
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#064e3b", "#064e3b", "#065f46", "#047857"]}
        width="100%"
        flex={1}
      >
        <Center w="100%" py="1" flex={1}>
          {children}
        </Center>
      </LinearGradient>
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
      <LinearGradient
        // Button Linear Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#064e3b", "#064e3b", "#065f46", "#047857"]}
        width="100%"
        minHeight="100%"
      >
        <Box p="0" w="100%" minHeight="100%">
          {children}
        </Box>
      </LinearGradient>
    </ScrollView>
  );
}

export function CContentTile({ children }) {
  return (
    <Center p="4" w="100%" bgColor="white" shadow="6">
      {children}
    </Center>
  );
}

export function CWholeSpaceContentTile({ children }) {
  return (
    <Center w="100%" h="100%" bgColor="white" shadow="6">
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
      borderWidth="1"
      p="1"
      mb="1"
      mx="1"
      borderRadius="10"
      bgColor="white"
      shadow="1"
    >
      {children}
    </Box>
  );
}

export function CInternalBorderHeaderTile({ children }) {
  return (
    <Center
      borderWidth="1"
      _dark={{
        borderColor: "gray.600",
      }}
      borderColor="coolGray.200"
      my="2"
      mx="1"
      borderRadius="10"
      bgColor="white"
      shadow="1"
    >
      {children}
    </Center>
  );
}
