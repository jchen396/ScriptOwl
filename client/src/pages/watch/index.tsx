import { GET_POST_BY_ID } from "@/graphql/queries/getPostById";
import { useEffect, useState } from "react";
import React from "react";
import client from "../../../apollo-client";
import { useSelector } from "react-redux";
import { getTimeDiff } from "@/functions/getTimeDiff";
import VideoSection from "@/components/Watch/VideoSection";
import CommentSection from "@/components/Watch/CommentSection";
import { IPost } from "../../../../types/types";
import { UPDATE_USER } from "@/graphql/mutations/updateUser";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/apiCalls";
import { useMutation } from "@apollo/client";
import { InferGetServerSidePropsType, NextPage } from "next";
import TranscriptSection from "@/components/Watch/TranscriptSection";
import SectionTabs from "@/components/Watch/SectionTabs";
import ChatGPTSection from "@/components/Watch/AISection";
import Image from "next/image";

interface Props {
    post: IPost;
}

const Watch: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ post }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [section, setSection] = useState<string>("comment");
    const [updateUserMutate] = useMutation(UPDATE_USER);
    const [isSSR, setIsSSR] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const { currentUser } = useSelector((state: any) => state.user);
    const { timeNumber, timeWord } = getTimeDiff(parseInt(post.createdAt.date));
    const [wordSelected, setWordSelected] = useState<string | null>("");
    const [chatReply, setChatReply] = useState<string | null>("");
    const [chatLoading, setChatLoading] = useState<boolean>(false);
    const [service, setService] = useState<string>("");
    const refreshSSRProps = () => {
        router.replace(router.asPath);
    };
    const refreshUserData = async () => {
        const id = currentUser.id;
        const { data } = await updateUserMutate({
            variables: {
                id,
            },
        });
        updateUser(dispatch, data.updateUser);
        refreshSSRProps();
    };
    const getSectionComponent = () => {
        if (section === "comment") {
            return (
                <CommentSection
                    post={post}
                    currentUser={currentUser}
                    refreshUserData={refreshUserData}
                    refreshSSRProps={refreshSSRProps}
                />
            );
        }
        if (section === "transcript") {
            return (
                <TranscriptSection
                    transcript={post.transcript}
                    setWordSelected={setWordSelected}
                    setSection={setSection}
                    setChatReply={setChatReply}
                    setChatLoading={setChatLoading}
                    setService={setService}
                    currentUser={currentUser}
                    requireUser={true}
                />
            );
        }
        if (section === "AI") {
            return (
                <ChatGPTSection
                    transcript={post.transcript}
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
        setIsSSR(false);
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            {!isSSR && (
                <>
                    {/* Loading overlay */}
                    <div
                        className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-950 transition-all duration-700 ${
                            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                    >
                        <div className="flex flex-col items-center gap-5">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute w-28 h-28 rounded-full bg-blue-500/10 animate-ping" />
                                <div className="absolute w-24 h-24 rounded-full bg-blue-500/5 animate-pulse" />
                                <Image
                                    src="/img/ScriptOwl_logo_transparent.png"
                                    alt="ScriptOwl"
                                    width={80}
                                    height={80}
                                    className="relative z-10 w-16 h-16 drop-shadow-[0_0_20px_rgba(59,130,246,0.4)] animate-pulse"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="h-1 w-32 rounded-full bg-gray-800 overflow-hidden">
                                    <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-500/60 to-transparent animate-shimmer-slide" />
                                </div>
                                <p className="text-gray-600 text-xs tracking-widest uppercase font-medium">Loading</p>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <div
                        className={`flex flex-col lg:flex-row w-full bg-gray-950 transition-all duration-700 ease-out ${
                            isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {/* Video section — left half */}
                        <div
                            className={`w-full lg:w-1/2 flex flex-col transition-all duration-700 delay-150 ease-out ${
                                isLoaded
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-6"
                            }`}
                        >
                            <VideoSection
                                currentUser={currentUser}
                                post={post}
                                timeNumber={timeNumber}
                                timeWord={timeWord}
                                refreshUserData={refreshUserData}
                            />
                        </div>

                        {/* Right half — transcript/comments/AI */}
                        <div
                            className={`w-full lg:w-1/2 lg:h-screen flex flex-col overflow-hidden bg-gray-900/40 border-l border-gray-800/40 transition-all duration-700 delay-300 ease-out ${
                                isLoaded
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-6"
                            }`}
                        >
                            <div className="shrink-0">
                                <SectionTabs
                                    post={post}
                                    section={section}
                                    setSection={setSection}
                                    service={service}
                                    requireUser={true}
                                />
                            </div>
                            <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar">
                                {getSectionComponent()}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export async function getServerSideProps(context: any) {
    const { data } = await client.query({
        query: GET_POST_BY_ID,
        variables: {
            id: context.query.v,
        },
        fetchPolicy: "no-cache",
    });
    return {
        props: { post: data.post },
    };
}

export default Watch;
