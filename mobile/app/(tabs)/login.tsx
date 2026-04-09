import { Text, ScrollView, TextInput, View, Pressable } from "react-native";

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-black items-center justify-center">
            <View className="flex-1 items-center justify-center space-y-4 h-full w-full space-y-4">
                <Text className="text-4xl font-mono text-white">Log In</Text>
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="#888"
                    className="w-[90%] p-4 border-2 border-blue-500 rounded-lg text-white"
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    className="w-[90%] p-4 border-2 border-blue-500 rounded-lg text-white"
                    secureTextEntry={true}
                />
                <Pressable className="bg-blue-500 p-4 rounded-lg">
                    <Text className="text-white text-lg">Log In</Text>
                </Pressable>
            </View>
        </View>
    );
}
