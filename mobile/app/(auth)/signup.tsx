import { Text, TextInput, View, Pressable } from "react-native";
import { Stack } from "expo-router";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-black items-center justify-center">
            <Stack.Screen options={{ headerBackTitle: "Back" }} />
            <View className="flex-1 items-center justify-center space-y-4 h-full w-full space-y-4">
                <Text className="text-4xl font-mono text-white">Sign Up</Text>
                <View className="w-full flex-row justify-center items-center m-4 p-4 bg-black border-blue-500 rounded-lg space-x-2">
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#888"
                        className="w-[90%] p-4 border-2 border-blue-500 rounded-lg text-white"
                    />
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#888"
                        className="w-[90%] p-4 border-2 border-blue-500 rounded-lg text-white"
                    />
                </View>
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    className="w-[90%] p-4 border-2 border-blue-500 rounded-lg text-white"
                    secureTextEntry={true}
                />
                <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#888"
                    className="w-[90%] p-4 border-2 border-blue-500 rounded-lg text-white"
                    secureTextEntry={true}
                />
                <Pressable className="bg-blue-500 p-4 rounded-lg">
                    <Text className="text-white text-lg">Sign Up</Text>
                </Pressable>
            </View>
        </View>
    );
}
