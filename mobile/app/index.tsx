import { Redirect } from "expo-router";
import { useSelector } from "react-redux";

export default function Index() {
    const { currentUser } = useSelector((state: any) => state.user);

    if (currentUser) {
        return <Redirect href="/(tabs)" />;
    }
    
    return <Redirect href="/(auth)/login" />;
}
