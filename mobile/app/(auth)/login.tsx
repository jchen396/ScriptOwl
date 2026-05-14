import { Text, TextInput, View, Pressable } from "react-native";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const { currentUser, isFetching, error } = useSelector(
        (state: any) => state.user,
    );
    const validateForm = () => {
        login(dispatch, {
            logInUsername: username,
            logInPassword: password,
        });
    };
    useEffect(() => {
        if (currentUser) {
            if (!currentUser.isVerified) {
                router.replace("/verify");
            } else {
                router.replace("/(tabs)");
            }
        }
    }, [currentUser, router]);
    useEffect(() => {
        if (error) {
            setErrorMessage(
                "Something went wrong. Please check your username and password and try again.",
            );
        } else {
            setErrorMessage("");
        }
    }, [error]);

    return (
        <View className="flex-1 bg-black items-center justify-center p-4">
            <Stack.Screen options={{ headerBackTitle: "Back", title: "Log In", headerShown: false }} />
            
            <Text className="text-4xl md:text-5xl font-extrabold tracking-tight text-cyan-400 mb-6 drop-shadow-lg">
                Log In
            </Text>

            <View className="flex flex-col space-y-6 bg-gray-800/80 border border-gray-700/50 rounded-2xl w-full sm:w-3/4 p-8">
                {errorMessage ? (
                    <View className="flex-row items-center bg-red-300 rounded-md p-4 space-x-2">
                        <Text className="text-red-700 text-sm flex-1">{errorMessage}</Text>
                        <Pressable onPress={() => setErrorMessage("")}>
                            <Text className="text-red-700 font-bold">✕</Text>
                        </Pressable>
                    </View>
                ) : null}

                <View className="relative w-full">
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#9ca3af"
                        className="block px-4 py-4 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 focus:border-cyan-400"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                    />
                </View>

                <View className="relative w-full mt-6">
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#9ca3af"
                        className="block px-4 py-4 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 focus:border-cyan-400"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <Pressable onPress={() => {}} className="mt-2">
                    <Text className="text-sm italic underline text-slate-100">
                        Forgot your password?
                    </Text>
                </Pressable>

                <Pressable
                    className={`w-full bg-blue-600 rounded-xl py-3 mt-6 items-center shadow-lg shadow-blue-500/30 ${
                        isFetching ? "opacity-70" : "active:opacity-80"
                    }`}
                    onPress={validateForm}
                    disabled={isFetching}
                >
                    <Text className="text-white font-semibold text-base">
                        {isFetching ? "Logging In..." : "Log In"}
                    </Text>
                </Pressable>

                <View className="flex-row items-center justify-between mt-4">
                    <Text className="text-slate-100">Don't have an account? </Text>
                    <Pressable onPress={() => router.push("/signup")}>
                        <Text className="italic underline text-slate-100">Sign Up</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}
