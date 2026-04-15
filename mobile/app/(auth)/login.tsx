import { Text, TextInput, View, Pressable } from "react-native";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const dispatch = useDispatch();
    const { currentUser, isFetching, error } = useSelector(
        (state: any) => state.user,
    );
    const validateForm = (e: any) => {
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
                router.back();
            }
            console.log(currentUser);
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
        <View className="flex-1 bg-black items-center justify-center">
            <Stack.Screen options={{ headerBackTitle: "Back" }} />
            <Text>{errorMessage}</Text>
            <View className="flex-1 items-center justify-center space-y-4 h-full w-full space-y-4">
                <Text className="text-4xl font-mono text-white">Log In</Text>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#888"
                    className="w-[90%] p-4 border-2 border-blue-500 rounded-lg text-white"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    className="w-[90%] p-4 border-2 border-blue-500 rounded-lg text-white"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Pressable
                    className={`bg-blue-500 p-4 rounded-lg 
						${
                            isFetching
                                ? "hover:cursor-not-allowed bg-blue-700"
                                : "hover:cursor-pointer"
                        }`}
                    onPress={validateForm}
                >
                    <Text className="text-white text-lg">Log In</Text>
                </Pressable>
            </View>
        </View>
    );
}
