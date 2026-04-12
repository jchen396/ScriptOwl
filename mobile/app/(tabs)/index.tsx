import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-black items-center justify-center">
            <ScrollView
                className="flex-1 h-full w-full"
                contentContainerClassName="items-center "
            >
                <Image
                    source={require("../../assets/images/ScriptOwl_logo_transparent.png")}
                    style={{ width: 200, height: 200 }}
                />
                <Text className="text-4xl font-mono text-white">ScriptOwl</Text>
                <Pressable
                    className="w-[90%] flex-1 justify-center items-center m-4 p-4 bg-black border-2 border-blue-500 rounded-lg"
                    onPress={() => router.push("/login")}
                >
                    <Text className="text-xl font-bold text-blue-500">
                        Log In
                    </Text>
                </Pressable>
                <Pressable
                    className="w-[90%] flex-1 justify-center items-center m-4 p-4 bg-black border-2 border-blue-500 rounded-lg"
                    onPress={() => router.push("/signup")}
                >
                    <Text className="text-xl font-bold text-blue-500">
                        Sign Up
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}
