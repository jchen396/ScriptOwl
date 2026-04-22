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
		const res = await axios.post(
			`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}youtube`,
			{
				youtubeURL,
			}
		);
		setYoutubeTranscript(res.data.result);
		setIsLoading(false);
	};
	return (
		<form
			action="submit"
			className="flex flex-row justify-center items-center p-4 lg:w-1/2 md:w-2/3 w-11/12 max-w-4xl mx-auto relative z-20 group"
			onSubmit={(e) => submitYoutubeURL(e)}
		>
			<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
			<div className="relative flex flex-1 items-center bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 hover:border-gray-500 focus-within:border-blue-500 rounded-2xl shadow-2xl transition-all duration-300 p-2 pl-6">
				<div className="flex-1">
					<input
						type="url"
						id="url"
						className="w-full bg-transparent text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-0 py-3"
						placeholder="Paste a YouTube URL here..."
						onChange={(e) => setYoutubeURL(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="flex-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl p-3 ml-2 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
					onClick={(e) => submitYoutubeURL(e)}
				>
					<ArrowForwardIcon className="h-6 w-6" />
				</button>
			</div>
		</form>
	);
};

export default URLInput;
