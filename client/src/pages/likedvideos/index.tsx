import React from "react";
import client from "../../../apollo-client";
import { USER_POSTS } from "@/graphql/queries/userPosts";
import { InferGetServerSidePropsType, NextPage } from "next";
import VideoGrid from "@/components/Explore/VideoGrid";

const Likedvideos: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
    return (
        <>
            <div className="w-full h-full bg-black flex flex-col justify-center items-center text-white space-y-10 py-10">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mb-6">
                    Liked Videos
                </h1>
                <div className="w-3/4 h-3/5 rounded ">
                    {data.userPosts.length !== 0 ? (
                        <div className="flex items-center justify-start p-4 overflow-y-auto text-white font-sans w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
                            <VideoGrid posts={data.userPosts} />
                        </div>
                    ) : (
                        <div className="w-full h-full flex justify-center items-center py-10">
                            <div className="bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 shadow-xl">
                                <p className="text-gray-300 text-lg font-light">No liked videos</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context: any) {
    const { data } = await client.query({
        query: USER_POSTS,
        variables: {
            postIds: context.query.postIds,
        },
        fetchPolicy: "no-cache",
    });
    return {
        props: { data },
    };
}

export default Likedvideos;
