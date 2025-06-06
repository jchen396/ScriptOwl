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
			className="flex flex-row justify-center items-center text-slate-100 p-2 lg:w-1/3 md:2/3 w-3/4"
			onSubmit={(e) => submitYoutubeURL(e)}
		>
			<div className="relative flex-1">
				<input
					type="text"
					id="url"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=""
					onChange={(e) => setYoutubeURL(e.target.value)}
					required
				/>
				<label
					htmlFor="url"
					className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
				>
					Enter Youtube URL
				</label>
			</div>
			<ArrowForwardIcon
				className="flex-none border-2 border-gray-500 rounded-lg hover:bg-blue-600 hover:cursor-pointer m-2 h-12 w-12"
				onClick={(e) => submitYoutubeURL(e)}
			/>
		</form>
	);
};

export default URLInput;
