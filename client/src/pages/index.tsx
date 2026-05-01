import React, { useEffect, useState } from "react";
import HeroSection from "@/components/Home/HeroSection";
import Info from "@/components/Home/Info";
import Head from "next/head";
import URLInput from "@/components/Home/URLInput";
import TranscriptSection from "@/components/Watch/TranscriptSection";
import AISection from "@/components/Watch/AISection";
import SectionTabs from "@/components/Watch/SectionTabs";

interface Props {}

const Home: React.FunctionComponent<Props> = ({}) => {
    const [youtubeURL, setYoutubeURL] = useState<string>("");
    const [youtubeID, setYoutubeID] = useState<string | null>("");
    const [youtubeTranscript, setYoutubeTranscript] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [wordSelected, setWordSelected] = useState<string | null>(null);
    const [section, setSection] = useState<string>("transcript");
    const [chatReply, setChatReply] = useState<string | null>(null);
    const [chatLoading, setChatLoading] = useState<boolean>(false);
    const [service, setService] = useState<string>("");
    const [wasTruncated, setWasTruncated] = useState<boolean>(false);
    const getYoutubeId = (url: string) => {
        const regExp =
            /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+[\?\&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);

        if (match && match[1]) {
            return match[1]; // Return the YouTube video ID
        }
        return null;
    };
    const getSectionComponent = () => {
        if (section === "transcript") {
            return (
                <TranscriptSection
                    transcript={youtubeTranscript}
                    setWordSelected={setWordSelected}
                    setSection={setSection}
                    setChatReply={setChatReply}
                    setChatLoading={setChatLoading}
                    setService={setService}
                    currentUser={null}
                    requireUser={false}
                />
            );
        }
        if (section === "AI") {
            return (
                <AISection
                    transcript={youtubeTranscript}
                    wordSelected={wordSelected}
                    chatReply={chatReply}
                    setChatReply={setChatReply}
                    chatLoading={chatLoading}
                    setChatLoading={setChatLoading}
                    service={service}
                />
            );
        }
    };
    useEffect(() => {
        if (youtubeURL) {
            setYoutubeID(getYoutubeId(youtubeURL));
        }
    }, [youtubeURL]);
    return (
        <div className="flex flex-col items-center justify-start text-white font-sans w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black pb-20">
            <Head>
                <title>
                    ScriptOwl | Revolutionizing Learning Through Video:
                    Real-Time Translation, Summarization, and Quizzes with
                    Artificial Intelligence
                </title>
                <meta
                    name="description"
                    content="ScriptOwl is a video streaming site is dedicated to revolutionizing the way people learn and consume media content. By harnessing the power of modern AI technology, we provide users with real-time translation of video transcripts, as well as a summarization feature that saves time and makes information more digestible. In addition, our quiz creation feature allows users to test their knowledge and reinforce what they've learned. Our goal is to break down language barriers and make learning more accessible to everyone, and we're constantly striving to innovate and improve the user experience. Join us on our mission to bring the world closer together through the power of video."
                />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta
                    property="og:title"
                    content="
					ScriptOwl | Revolutionizing Learning Through Video:
					Real-Time Translation, Summarization, and Quizzes with Artificial Intelligence
				"
                    key="title"
                />
                <link rel="icon" href="/img/ScriptOwl_logo_transparent.png" />
            </Head>
            <HeroSection />
            {isLoading ? (
                <div className="p-6 w-11/12 max-w-[1400px] mx-auto flex flex-col xl:flex-row justify-center items-start gap-8 my-12">
                    <div className="w-full xl:basis-2/3 flex flex-col items-center bg-gray-900/40 p-4 rounded-3xl border border-gray-800/60 shadow-2xl backdrop-blur-xl">
                        <div className="w-full relative pt-[56.25%] rounded-2xl overflow-hidden bg-gray-800/50 animate-pulse border border-gray-700/30">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:basis-1/3 min-h-[500px] xl:h-[65vh] flex flex-col p-4 bg-gray-900/40 rounded-3xl border border-gray-800/60 shadow-2xl backdrop-blur-xl">
                        <div className="w-full h-12 bg-gray-800/50 rounded-lg mb-4 animate-pulse"></div>
                        <div className="flex-1 w-full bg-gray-800/30 rounded-2xl p-6 flex flex-col gap-3">
                            <div className="w-full h-4 bg-gray-700/50 rounded animate-pulse"></div>
                            <div className="w-11/12 h-4 bg-gray-700/50 rounded animate-pulse delay-75"></div>
                            <div className="w-4/5 h-4 bg-gray-700/50 rounded animate-pulse delay-150"></div>
                            <div className="w-full h-4 bg-gray-700/50 rounded animate-pulse delay-200 mt-2"></div>
                            <div className="w-3/4 h-4 bg-gray-700/50 rounded animate-pulse delay-300"></div>
                            <div className="w-5/6 h-4 bg-gray-700/50 rounded animate-pulse delay-500"></div>
                        </div>
                        <div className="w-full mt-4 flex justify-center gap-4">
                            <div className="w-24 h-10 bg-gray-800/80 rounded-full animate-pulse"></div>
                            <div className="w-28 h-10 bg-gray-800/80 rounded-full animate-pulse delay-100"></div>
                            <div className="w-24 h-10 bg-gray-800/80 rounded-full animate-pulse delay-200"></div>
                        </div>
                    </div>
                </div>
            ) : youtubeTranscript ? (
                <div className="p-6 w-11/12 max-w-[1400px] mx-auto flex flex-col xl:flex-row justify-center items-start gap-8 animate-fade-in my-12">
                    <div className="w-full xl:basis-2/3 flex flex-col items-center bg-gray-900/40 p-4 rounded-3xl border border-gray-800/60 shadow-2xl backdrop-blur-xl hover:border-gray-700/60 transition-colors duration-300">
                        <div className="w-full relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-gray-700/30">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${youtubeID}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="w-full xl:basis-1/3 min-h-[500px] xl:h-[65vh] flex flex-col justify-start items-center text-white bg-gray-900/40 rounded-3xl border border-gray-800/60 shadow-2xl backdrop-blur-xl overflow-hidden hover:border-gray-700/60 transition-colors duration-300">
                        {/* Truncation warning banner */}
                        {wasTruncated && (
                            <div className="w-full px-4 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2">
                                <span className="text-amber-400 text-xs">⚠️</span>
                                <p className="text-amber-400/90 text-[11px] leading-tight">
                                    This video&apos;s transcript was too long and has been trimmed to fit the AI&apos;s processing limit. For best results, try shorter videos (under ~15 min).
                                </p>
                            </div>
                        )}
                        <div className="w-full bg-gray-800/50 border-b border-gray-700/50">
                            <SectionTabs
                                post={null}
                                section={section}
                                setSection={setSection}
                                service={service}
                                requireUser={false}
                            />
                        </div>
                        <div className="w-full flex-1 overflow-y-auto hide-scrollbar">
                            {getSectionComponent()}
                        </div>
                    </div>
                </div>
            ) : (
                <URLInput
                    youtubeURL={youtubeURL}
                    setYoutubeURL={setYoutubeURL}
                    setYoutubeTranscript={setYoutubeTranscript}
                    setIsLoading={setIsLoading}
                    setWasTruncated={setWasTruncated}
                />
            )}
            <hr className="border border-gray-700 w-3/4 " />
            <Info />
        </div>
    );
};

export default Home;
