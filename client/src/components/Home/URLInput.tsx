import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import React, { useState } from "react";

type Props = {
	youtubeURL: string;
	setYoutubeURL: React.Dispatch<React.SetStateAction<string>>;
	setYoutubeTranscript: React.Dispatch<React.SetStateAction<string>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const URLInput: React.FunctionComponent<Props> = ({
	youtubeURL,
	setYoutubeURL,
	setYoutubeTranscript,
	setIsLoading,
}) => {
	const submitYoutubeURL = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			// Try Vercel API route first (uses Vercel's distributed IPs)
			const res = await axios.post("/api/youtube-transcript", {
				youtubeURL,
			});
			setYoutubeTranscript(res.data.result);
		} catch {
			// Fallback to Render server
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}youtube`,
				{ youtubeURL }
			);
			setYoutubeTranscript(res.data.result);
		}
		setIsLoading(false);
	};
	return (
		<div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto my-12 animate-fade-in px-4">
			<div className="mb-8 text-center space-y-4">
				<div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-2 backdrop-blur-md">
					<span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Free Trial Version</span>
				</div>
				<h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-md">
					Experience the Magic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Live</span>
				</h2>
				<p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
					Paste any YouTube video link below to see ScriptOwl in action. Generate transcripts, AI summaries, and quizzes instantly.
				</p>
			</div>

			<form
				action="submit"
				className="flex flex-row justify-center items-center w-full relative z-20 group"
				onSubmit={(e) => submitYoutubeURL(e)}
			>
				<div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-50 transition-all duration-500"></div>
				<div className="relative flex flex-1 items-center bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 hover:border-blue-500/50 focus-within:border-blue-500 rounded-2xl shadow-2xl transition-all duration-300 p-2 pl-6">
					<div className="flex-1">
						<input
							type="url"
							id="url"
							className="w-full bg-transparent text-lg text-white placeholder-gray-500 focus:outline-none focus:ring-0 py-4"
							placeholder="Paste a YouTube URL here..."
							onChange={(e) => setYoutubeURL(e.target.value)}
							required
						/>
					</div>
					<button
						type="submit"
						className="flex-none flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl px-6 py-4 ml-2 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-95 font-semibold text-lg"
						onClick={(e) => submitYoutubeURL(e)}
					>
						<span>Try Now</span>
						<ArrowForwardIcon className="h-5 w-5" />
					</button>
				</div>
			</form>
		</div>
	);
};

export default URLInput;
