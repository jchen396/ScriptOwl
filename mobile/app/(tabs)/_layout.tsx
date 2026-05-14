import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#22d3ee",
                tabBarInactiveTintColor: "#4b5563",
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: {
                    backgroundColor: "#0f1219",
                    borderTopColor: "rgba(255,255,255,0.06)",
                    borderTopWidth: 1,
                    height: Platform.OS === "ios" ? 88 : 64,
                    paddingBottom: Platform.OS === "ios" ? 28 : 8,
                    paddingTop: 8,
                    elevation: 0,
                    shadowOpacity: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="house.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: "Explore",
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={28}
                            name="paperplane.fill"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
