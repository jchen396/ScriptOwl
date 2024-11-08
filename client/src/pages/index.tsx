import React, { useEffect, useState } from "react";
import HeroSection from "@/components/Home/HeroSection";
import Info from "@/components/Home/Info";
import Head from "next/head";
import URLInput from "@/components/Home/URLInput";
import TranscriptSection from "@/components/Watch/TranscriptSection";

interface Props {}

const Home: React.FunctionComponent<Props> = ({}) => {
	const [youtubeURL, setYoutubeURL] = useState<string>("");
	const [youtubeID, setYoutubeID] = useState<string | null>("");
	const [youtubeTranscript, setYoutubeTranscript] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [wordSelected, setWordSelected] = useState<string | null>(null);
	const [section, setSection] = useState<string>("");
	const [chatReply, setChatReply] = useState<string | null>(null);
	const [chatLoading, setChatLoading] = useState<boolean>(false);
	const [service, setService] = useState<string>("");
	const getYoutubeId = (url: string) => {
		const regExp =
			/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S+[\?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
		const match = url.match(regExp);

		if (match && match[1]) {
			return match[1]; // Return the YouTube video ID
		}
		return null;
	};
	useEffect(() => {
		if (youtubeURL) {
			setYoutubeID(getYoutubeId(youtubeURL));
		}
	}, [youtubeURL]);
	return (
		<div className="flex flex-wrap items-center justify-center text-white space-y-10 font-mono ">
			<Head>
				<title>
					ScriptOwl | Revolutionizing Learning Through Video:
					Real-Time Translation, Summarization, and Quizzes with GPT
					3.5
				</title>
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
					ScriptOwl | Revolutionizing Learning Through Video:
					Real-Time Translation, Summarization, and Quizzes with GPT
					3.5
				"
					key="title"
				/>
				<link rel="icon" href="/img/ScriptOwl_logo_transparent.png" />
			</Head>
			<HeroSection />
			{isLoading ? (
				<div className="w-full flex flex-row justify-center items-center space-x-4">
					<div role="status">
						<div
							className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
							role="status"
						>
							<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
								Loading...
							</span>
						</div>
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			) : youtubeTranscript ? (
				<div className="p-4 w-3/4 flex flex-col md:flex-row justify-center items-center space-x-4">
					<iframe
						width="720"
						height="360"
						src={`https://www.youtube.com/embed/${youtubeID}`}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
					<div className="basis-1/3 h-screen w-full flex flex-col justify-center items-center text-white ">
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
					</div>
				</div>
			) : (
				<URLInput
					youtubeURL={youtubeURL}
					setYoutubeURL={setYoutubeURL}
					setYoutubeTranscript={setYoutubeTranscript}
					setIsLoading={setIsLoading}
				/>
			)}
			<hr className="border border-gray-700 w-3/4 " />
			<Info />
		</div>
	);
};

export default Home;
