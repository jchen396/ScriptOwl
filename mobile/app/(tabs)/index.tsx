import { router } from "expo-router";
import {
    Image,
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Platform,
    StatusBar,
    Dimensions,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import Animated, {
    FadeInDown,
    FadeInUp,
    FadeInRight,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing,
    interpolateColor,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const FEATURES = [
    {
        id: "translation",
        icon: "translate" as const,
        title: "Translate",
        badge: "100+ Langs",
        gradient: ["#3b82f6", "#6366f1"] as [string, string],
        desc: "Break language barriers instantly. Translate any video transcript into the language of your choice.",
    },
    {
        id: "summarize",
        icon: "auto-awesome" as const,
        title: "Summarize",
        badge: "Deep AI",
        gradient: ["#8b5cf6", "#a855f7"] as [string, string],
        desc: "Get key points in seconds. AI generates comprehensive summaries so you never miss important details.",
    },
    {
        id: "assessment",
        icon: "quiz" as const,
        title: "Quizzes",
        badge: "Interactive",
        gradient: ["#06b6d4", "#0ea5e9"] as [string, string],
        desc: "Test your knowledge with auto-generated quizzes directly from video transcripts.",
    },
];

const STATS = [
    { label: "Languages", value: "100+", icon: "language" as const },
    { label: "Users", value: "10K+", icon: "people" as const },
    { label: "Videos", value: "50K+", icon: "play-circle-filled" as const },
];

export default function HomeScreen() {
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);

    // Pulsing glow animation
    const glowAnim = useSharedValue(0);
    useEffect(() => {
        glowAnim.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
                withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
            ),
            -1,
            false,
        );
    }, []);

    const glowStyle = useAnimatedStyle(() => ({
        opacity: 0.15 + glowAnim.value * 0.15,
        transform: [{ scale: 1 + glowAnim.value * 0.08 }],
    }));

    return (
        <View style={{ flex: 1, backgroundColor: "#0a0d14" }}>
            <SafeAreaView
                style={{
                    flex: 1,
                    paddingTop:
                        Platform.OS === "android"
                            ? StatusBar.currentHeight
                            : 0,
                }}
            >
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 50 }}
                >
                    {/* ─── Header ─── */}
                    <Animated.View
                        entering={FadeInDown.duration(500).delay(100)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingHorizontal: 20,
                            paddingTop: 8,
                            paddingBottom: 12,
                        }}
                    >
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Image
                                source={require("../../assets/images/ScriptOwl_logo_transparent.png")}
                                style={{ width: 36, height: 36 }}
                            />
                            <Text style={{ color: "#fff", fontWeight: "800", fontSize: 20, letterSpacing: 1 }}>
                                ScriptOwl
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <TouchableOpacity
                                style={{
                                    width: 40, height: 40, borderRadius: 20,
                                    backgroundColor: "rgba(255,255,255,0.07)",
                                    alignItems: "center", justifyContent: "center",
                                }}
                            >
                                <MaterialIcons name="notifications-none" size={22} color="#6b7280" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: 40, height: 40, borderRadius: 20,
                                    overflow: "hidden",
                                    borderWidth: 2, borderColor: "rgba(6,182,212,0.35)",
                                }}
                            >
                                <Image
                                    source={require("../../assets/images/blank-profile.png")}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* ─── Hero Section with Mascot ─── */}
                    <View style={{ position: "relative", paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 }}>
                        {/* Background glow */}
                        <Animated.View
                            style={[
                                {
                                    position: "absolute",
                                    top: -30, right: -40,
                                    width: 220, height: 220,
                                    borderRadius: 110,
                                    backgroundColor: "#06b6d4",
                                },
                                glowStyle,
                            ]}
                        />
                        <Animated.View
                            style={[
                                {
                                    position: "absolute",
                                    bottom: 0, left: -30,
                                    width: 160, height: 160,
                                    borderRadius: 80,
                                    backgroundColor: "#8b5cf6",
                                },
                                glowStyle,
                            ]}
                        />

                        {/* Mascot + Text side by side */}
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Animated.View entering={FadeInDown.duration(600).delay(200)} style={{ flex: 1 }}>
                                <Text style={{ color: "#9ca3af", fontSize: 11, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>
                                    AI-POWERED VIDEO LEARNING
                                </Text>
                                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 30, lineHeight: 36, marginBottom: 4 }}>
                                    Your Video{"\n"}Content
                                </Text>
                                <Text style={{ fontWeight: "800", fontSize: 30, color: "#22d3ee", marginBottom: 8 }}>
                                    Revolutionized
                                </Text>
                            </Animated.View>
                            <Animated.View entering={FadeInRight.duration(700).delay(400)}>
                                <Image
                                    source={require("../../assets/images/cartoon_boy_video.png")}
                                    style={{
                                        width: 130, height: 130,
                                        borderRadius: 65,
                                        borderWidth: 3,
                                        borderColor: "rgba(34,211,238,0.25)",
                                    }}
                                    resizeMode="cover"
                                />
                            </Animated.View>
                        </View>

                        <Animated.View entering={FadeInDown.duration(500).delay(350)}>
                            <Text style={{ color: "#9ca3af", fontSize: 14, lineHeight: 22, marginTop: 8 }}>
                                Generate instant translations, deep summaries, and interactive quizzes from any video transcript.
                            </Text>
                            <Text style={{ color: "#6b7280", fontSize: 11, marginTop: 6 }}>
                                ⏱️ For best AI results, use videos under ~15 minutes.
                            </Text>
                        </Animated.View>
                    </View>

                    {/* ─── URL Input Card (Glassmorphism) ─── */}
                    <Animated.View
                        entering={FadeInDown.duration(500).delay(450)}
                        style={{ paddingHorizontal: 20, marginBottom: 28 }}
                    >
                        <View
                            style={{
                                backgroundColor: "rgba(255,255,255,0.04)",
                                borderRadius: 20, padding: 18,
                                borderWidth: 1,
                                borderColor: "rgba(255,255,255,0.08)",
                            }}
                        >
                            <Text style={{ color: "#e5e7eb", fontWeight: "600", fontSize: 14, marginBottom: 12 }}>
                                🎬  Paste a YouTube URL to get started
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row", alignItems: "center",
                                    backgroundColor: "#0a0d14",
                                    borderRadius: 14,
                                    borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
                                    paddingLeft: 14, paddingRight: 5, paddingVertical: 5,
                                }}
                            >
                                <MaterialIcons name="link" size={20} color="#4b5563" />
                                <TextInput
                                    style={{ flex: 1, color: "#fff", fontSize: 13, marginLeft: 8, paddingVertical: 8 }}
                                    placeholder="https://youtube.com/watch?v=..."
                                    placeholderTextColor="#374151"
                                    value={youtubeUrl}
                                    onChangeText={setYoutubeUrl}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="url"
                                />
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10,
                                        marginLeft: 4,
                                        overflow: "hidden",
                                    }}
                                    onPress={() => console.log("Submit", youtubeUrl)}
                                    activeOpacity={0.8}
                                >
                                    <LinearGradient
                                        colors={["#06b6d4", "#3b82f6"]}
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                        style={{
                                            position: "absolute", top: 0, left: 0,
                                            right: 0, bottom: 0, borderRadius: 10,
                                        }}
                                    />
                                    <MaterialIcons name="arrow-forward" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: "#4b5563", fontSize: 11, marginTop: 8 }}>
                                3 free generations per day • No account required
                            </Text>
                        </View>
                    </Animated.View>

                    {/* ─── Stats Row ─── */}
                    <Animated.View
                        entering={FadeInDown.duration(500).delay(550)}
                        style={{
                            flexDirection: "row", justifyContent: "space-around",
                            paddingHorizontal: 20, marginBottom: 28,
                        }}
                    >
                        {STATS.map((stat, i) => (
                            <View
                                key={stat.label}
                                style={{
                                    alignItems: "center",
                                    backgroundColor: "rgba(255,255,255,0.03)",
                                    borderRadius: 16, paddingVertical: 14, paddingHorizontal: 16,
                                    borderWidth: 1, borderColor: "rgba(255,255,255,0.06)",
                                    flex: 1, marginHorizontal: 5,
                                }}
                            >
                                <MaterialIcons name={stat.icon} size={20} color="#22d3ee" />
                                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 20, marginTop: 6 }}>
                                    {stat.value}
                                </Text>
                                <Text style={{ color: "#6b7280", fontSize: 11, marginTop: 2 }}>
                                    {stat.label}
                                </Text>
                            </View>
                        ))}
                    </Animated.View>

                    {/* ─── Features Horizontal Carousel ─── */}
                    <Animated.View entering={FadeInDown.duration(500).delay(650)} style={{ marginBottom: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 14 }}>
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18 }}>
                                Features
                            </Text>
                            <Text style={{ color: "#22d3ee", fontSize: 13, fontWeight: "600" }}>
                                See all
                            </Text>
                        </View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
                            decelerationRate="fast"
                            snapToInterval={SCREEN_WIDTH * 0.7 + 14}
                        >
                            {FEATURES.map((feature) => (
                                <TouchableOpacity
                                    key={feature.id}
                                    activeOpacity={0.85}
                                    onPress={() => setExpandedId(expandedId === feature.id ? null : feature.id)}
                                    style={{ width: SCREEN_WIDTH * 0.7 }}
                                >
                                    <View
                                        style={{
                                            borderRadius: 20, padding: 20,
                                            borderWidth: 1,
                                            borderColor: expandedId === feature.id
                                                ? feature.gradient[0] + "60"
                                                : "rgba(255,255,255,0.06)",
                                            backgroundColor: expandedId === feature.id
                                                ? feature.gradient[0] + "10"
                                                : "rgba(255,255,255,0.03)",
                                            height: 200,
                                            overflow: "hidden",
                                        }}
                                    >
                                        {/* Decorative corner glow */}
                                        <View
                                            style={{
                                                position: "absolute", top: -30, right: -30,
                                                width: 100, height: 100, borderRadius: 50,
                                                backgroundColor: feature.gradient[0],
                                                opacity: 0.08,
                                            }}
                                        />

                                        {/* Badge */}
                                        <View
                                            style={{
                                                alignSelf: "flex-start",
                                                borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4,
                                                backgroundColor: feature.gradient[0] + "20",
                                                marginBottom: 12,
                                            }}
                                        >
                                            <Text style={{ color: feature.gradient[0], fontSize: 10, fontWeight: "700" }}>
                                                {feature.badge}
                                            </Text>
                                        </View>

                                        {/* Icon */}
                                        <View
                                            style={{
                                                width: 48, height: 48, borderRadius: 14,
                                                alignItems: "center", justifyContent: "center",
                                                marginBottom: 14,
                                                overflow: "hidden",
                                            }}
                                        >
                                            <LinearGradient
                                                colors={feature.gradient}
                                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                                style={{
                                                    position: "absolute", top: 0, left: 0,
                                                    right: 0, bottom: 0, opacity: 0.15,
                                                }}
                                            />
                                            <MaterialIcons name={feature.icon} size={26} color={feature.gradient[0]} />
                                        </View>

                                        {/* Title + arrow */}
                                        <View style={{ flex: 1, justifyContent: "flex-end" }}>
                                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
                                                    {feature.title}
                                                </Text>
                                                <View
                                                    style={{
                                                        width: 28, height: 28, borderRadius: 14,
                                                        backgroundColor: "rgba(255,255,255,0.06)",
                                                        alignItems: "center", justifyContent: "center",
                                                    }}
                                                >
                                                    <MaterialIcons
                                                        name={expandedId === feature.id ? "expand-less" : "arrow-forward"}
                                                        size={14} color="#9ca3af"
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    {/* ─── Expanded Feature Detail ─── */}
                    {expandedId && (
                        <Animated.View
                            entering={FadeInDown.duration(400)}
                            style={{ paddingHorizontal: 20, marginTop: 6, marginBottom: 24 }}
                        >
                            {FEATURES.filter((f) => f.id === expandedId).map((feature) => (
                                <View
                                    key={feature.id}
                                    style={{
                                        borderRadius: 20, padding: 20,
                                        borderWidth: 1,
                                        borderColor: feature.gradient[0] + "30",
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                    }}
                                >
                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                        <View
                                            style={{
                                                width: 40, height: 40, borderRadius: 12,
                                                alignItems: "center", justifyContent: "center",
                                                backgroundColor: feature.gradient[0] + "20",
                                            }}
                                        >
                                            <MaterialIcons name={feature.icon} size={22} color={feature.gradient[0]} />
                                        </View>
                                        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 17, flex: 1 }}>
                                            {feature.title}
                                        </Text>
                                        <TouchableOpacity onPress={() => setExpandedId(null)}>
                                            <MaterialIcons name="close" size={20} color="#6b7280" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ color: "#9ca3af", fontSize: 14, lineHeight: 22 }}>
                                        {feature.desc}
                                    </Text>
                                </View>
                            ))}
                        </Animated.View>
                    )}

                    {/* ─── Services List ─── */}
                    <Animated.View
                        entering={FadeInDown.duration(500).delay(750)}
                        style={{ paddingHorizontal: 20, marginBottom: 28 }}
                    >
                        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 18, marginBottom: 14 }}>
                            Supercharge your learning
                        </Text>
                        {[
                            {
                                icon: "translate" as const,
                                title: "Real-Time Translation",
                                subtitle: "Break language barriers instantly across 100+ languages",
                                gradient: ["#3b82f6", "#6366f1"] as [string, string],
                            },
                            {
                                icon: "auto-awesome" as const,
                                title: "Smart Summarization",
                                subtitle: "Get key points in seconds with AI-powered summaries",
                                gradient: ["#8b5cf6", "#a855f7"] as [string, string],
                            },
                            {
                                icon: "quiz" as const,
                                title: "AI Assessment",
                                subtitle: "Test your knowledge with auto-generated quizzes",
                                gradient: ["#06b6d4", "#0ea5e9"] as [string, string],
                            },
                        ].map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                style={{
                                    flexDirection: "row", alignItems: "center",
                                    backgroundColor: "rgba(255,255,255,0.03)",
                                    borderRadius: 18, padding: 16, marginBottom: 10,
                                    borderWidth: 1, borderColor: "rgba(255,255,255,0.06)",
                                }}
                            >
                                <View
                                    style={{
                                        width: 48, height: 48, borderRadius: 14,
                                        alignItems: "center", justifyContent: "center",
                                        marginRight: 14, overflow: "hidden",
                                    }}
                                >
                                    <LinearGradient
                                        colors={item.gradient}
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                                        style={{
                                            position: "absolute", top: 0, left: 0,
                                            right: 0, bottom: 0, opacity: 0.15,
                                        }}
                                    />
                                    <MaterialIcons name={item.icon} size={24} color={item.gradient[0]} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14, marginBottom: 2 }}>
                                        {item.title}
                                    </Text>
                                    <Text style={{ color: "#6b7280", fontSize: 12, lineHeight: 18 }}>
                                        {item.subtitle}
                                    </Text>
                                </View>
                                <MaterialIcons name="chevron-right" size={20} color="#374151" />
                            </TouchableOpacity>
                        ))}
                    </Animated.View>

                    {/* ─── CTA Section ─── */}
                    <Animated.View
                        entering={FadeInDown.duration(500).delay(850)}
                        style={{ paddingHorizontal: 20, marginBottom: 28 }}
                    >
                        <View
                            style={{
                                borderRadius: 24, padding: 28, alignItems: "center",
                                borderWidth: 1, borderColor: "rgba(6,182,212,0.15)",
                                backgroundColor: "rgba(6,182,212,0.05)",
                                overflow: "hidden",
                            }}
                        >
                            {/* Decorative orbs */}
                            <View style={{ position: "absolute", top: -20, left: -20, width: 100, height: 100, borderRadius: 50, backgroundColor: "#06b6d4", opacity: 0.06 }} />
                            <View style={{ position: "absolute", bottom: -20, right: -20, width: 80, height: 80, borderRadius: 40, backgroundColor: "#8b5cf6", opacity: 0.06 }} />

                            <MaterialIcons name="rocket-launch" size={36} color="#22d3ee" />
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 20, marginTop: 14, marginBottom: 6, textAlign: "center" }}>
                                Ready to get started?
                            </Text>
                            <Text style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", marginBottom: 20, lineHeight: 22, maxWidth: 260 }}>
                                Join now and supercharge your learning with AI-powered tools.
                            </Text>
                            <TouchableOpacity
                                onPress={() => router.push("/signup")}
                                activeOpacity={0.8}
                                style={{ borderRadius: 14, overflow: "hidden" }}
                            >
                                <LinearGradient
                                    colors={["#06b6d4", "#3b82f6"]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                                    style={{
                                        paddingHorizontal: 32, paddingVertical: 14,
                                        borderRadius: 14,
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>
                                        Create Account
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* ─── Footer ─── */}
                    <View style={{ paddingHorizontal: 20, alignItems: "center", paddingBottom: 10 }}>
                        <View style={{ width: 48, height: 2, backgroundColor: "#1f2937", borderRadius: 1, marginBottom: 16 }} />
                        <Text style={{ color: "#4b5563", fontSize: 11, textAlign: "center", lineHeight: 18 }}>
                            ScriptOwl — Revolutionizing learning through video with AI-powered translation, summarization, and assessments.
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
