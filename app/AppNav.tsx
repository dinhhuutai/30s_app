import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { AuthContext } from "@/context/AuthContext";

const AppNav = () => {
    const { isLoading = false, user = null } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sms" options={{ headerShown: false }} />
            <Stack.Screen name="revenue" options={{ headerShown: false }} />
            <Stack.Screen name="member" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="user" options={{ headerShown: false }} />
            {user?.token !== null ? (
                <Stack.Screen
                    name="(drawer)"
                    options={{ headerShown: false }}
                />
            ) : (
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            )}
        </Stack>
    );
};

export default AppNav;
