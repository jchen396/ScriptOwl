import { Text, TextInput, View, Pressable } from "react-native";
import { Stack } from "expo-router";

export default function VerifyScreen() {
    return (
        <View className="flex-1 bg-black items-center justify-center">
            <Stack.Screen options={{ headerBackTitle: "Back" }} />
            <View className="flex-1 items-center justify-center space-y-4 h-full w-full space-y-4">
                <Text className="text-4xl font-mono text-white">
                    Need Verification!
                </Text>
            </View>
        </View>
    );
}
