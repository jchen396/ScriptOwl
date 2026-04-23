import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import Head from "next/head";

type Props = {};

const Pricing = (props: Props) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-10 py-10 text-white font-sans w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            <Head>
                <title>ScriptOwl | Pricing</title>
                <meta
                    name="description"
                    content="ScriptOwl is a video streaming site is dedicated to revolutionizing the way people learn and consume media content. By harnessing the power of GPT 3.5, we provide users with real-time translation of video transcripts, as well as a summarization feature that saves time and makes information more digestible. In addition, our quiz creation feature allows users to test their knowledge and reinforce what they've learned. Our goal is to break down language barriers and make learning more accessible to everyone, and we're constantly striving to innovate and improve the user experience. Join us on our mission to bring the world closer together through the power of video."
                />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta
                    property="og:title"
                    content="
					ScriptOwl | Pricing
				"
                    key="title"
                />
                <link rel="icon" href="/img/ScriptOwl_logo_transparent.png" />
            </Head>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mb-6">Pricing</h1>
            <div className="flex flex-col space-y-4 lg:flex-row space-x-4 justify-around items-center">
                <div className="w-80 flex flex-col bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-3xl text-white p-8 transition-all hover:-translate-y-2 hover:shadow-blue-500/20">
                    <h2 className="self-center text-3xl font-bold py-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">Free Tier</h2>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>Video Upload</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>Commenting</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>Video Transcript</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>AI tools permission</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <div className="flex justify-between py-4">
                        <p>Live User Chats</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold py-3 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
                        Select Plan
                    </button>
                </div>
                <div className="w-80 flex flex-col bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-3xl text-white p-8 transition-all hover:-translate-y-2 hover:shadow-blue-500/20">
                    <h2 className="self-center text-3xl font-bold py-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Standard Tier</h2>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>Video Upload</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>Commenting</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>Video Transcript</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>AI tools permission</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <div className="flex justify-between py-4">
                        <p>Live User Chats</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold py-3 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
                        Select Plan
                    </button>
                </div>
                <div className="w-80 flex flex-col bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-3xl text-white p-8 transition-all hover:-translate-y-2 hover:shadow-blue-500/20">
                    <h2 className="self-center text-3xl font-bold py-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Premium Tier</h2>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>Video Upload</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>Commenting</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>Video Transcript</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <hr className="border-gray-500 border-1 opacity-50" />
                    <div className="flex justify-between py-4">
                        <p>AI tools permission</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <div className="flex justify-between py-4">
                        <p>Live User Chats</p>
                        <CheckIcon className="text-blue-500" />
                    </div>
                    <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold py-3 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5">
                        Select Plan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Pricing;
