import { Text, TextInput, View, Pressable } from "react-native";
import { Stack, router } from "expo-router";

export default function SignupScreen() {
    return (
        <View className="flex-1 bg-[#1e2532] items-center justify-center p-4">
            <Stack.Screen options={{ headerBackTitle: "Back", title: "Sign Up", headerShown: false }} />
            
            <Text className="text-4xl md:text-5xl font-extrabold tracking-tight text-cyan-400 mb-6 drop-shadow-lg">
                Sign Up
            </Text>

            <View className="flex flex-col space-y-5 bg-gray-800/80 border border-gray-700/50 rounded-2xl w-full sm:w-3/4 p-8">
                <View className="relative w-full">
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#9ca3af"
                        className="block px-4 py-4 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 focus:border-cyan-400"
                        autoCapitalize="none"
                    />
                </View>

                <View className="relative w-full">
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#9ca3af"
                        className="block px-4 py-4 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 focus:border-cyan-400"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View className="relative w-full">
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#9ca3af"
                        className="block px-4 py-4 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 focus:border-cyan-400"
                        secureTextEntry={true}
                    />
                </View>

                <View className="relative w-full">
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor="#9ca3af"
                        className="block px-4 py-4 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 focus:border-cyan-400"
                        secureTextEntry={true}
                    />
                </View>

                <Pressable className="w-full bg-blue-600 rounded-xl py-3 mt-6 items-center shadow-lg shadow-blue-500/30 active:opacity-80">
                    <Text className="text-white font-semibold text-base">Sign Up</Text>
                </Pressable>
                
                <View className="flex-row items-center justify-between mt-4">
                    <Text className="text-slate-100">Already have an account? </Text>
                    <Pressable onPress={() => router.back()}>
                        <Text className="italic underline text-slate-100">Log In</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
