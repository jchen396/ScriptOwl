import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import Head from "next/head";

type Props = {};

const Pricing = (props: Props) => {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-10">
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
			<h1 className="text-4xl font-medium text-slate-100">Pricing</h1>
			<div className="w-80 h-160 flex flex-col border-2 border-white rounded text-white p-4 space-x-6">
				<h2 className="self-center text-2xl py-4">Free Tier</h2>
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
			</div>
		</div>
	);
};

export default Pricing;
