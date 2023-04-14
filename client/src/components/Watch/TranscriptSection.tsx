import {
	getDefinition,
	getTranscriptServices,
} from "@/functions/openai_function/getReply";
import React, { useState } from "react";

interface Props {
	transcript: string;
	setWordSelected: React.Dispatch<React.SetStateAction<string | null>>;
	setSection: React.Dispatch<React.SetStateAction<string>>;
	setChatReply: React.Dispatch<React.SetStateAction<string | null>>;
	setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setService: React.Dispatch<React.SetStateAction<string>>;
}

const TranscriptSection: React.FC<Props> = ({
	transcript,
	setWordSelected,
	setSection,
	setChatReply,
	setChatLoading,
	setService,
}) => {
	const handleWordSelect = async (
		e: React.MouseEvent<HTMLSpanElement, MouseEvent>
	) => {
		setChatLoading(true);
		let highlightedWord = e.currentTarget.textContent?.trim();
		if (highlightedWord) {
			// Remove period if an ending word is selected
			if (
				highlightedWord &&
				highlightedWord[highlightedWord.length - 1] === "."
			) {
				highlightedWord = highlightedWord.slice(
					0,
					highlightedWord.length - 1
				);
			}
			setWordSelected(highlightedWord);
			setService("define");
			setSection("ChatGPT");
			const reply = await getDefinition(highlightedWord);
			setChatReply(reply);
			setChatLoading(false);
		}
	};
	const handleOptionSelect = async (option: string) => {
		let reply;
		setChatLoading(true);
		setService(option);
		setSection("ChatGPT");
		if (option === "summarize" || option === "assess") {
			reply = await getTranscriptServices(
				transcript.replace(/(\r\n|\n|\r)/gm, ""),
				option
			);
			setChatReply(reply);
		}
		setChatLoading(false);
	};
	return (
		<div className="h-4/5 w-full flex flex-col space-y-4">
			<div className="basis-4/5 text-gray-600 flex flex-wrap border-2 bg-transparent border-gray-800 rounded-lg overflow-y-scroll p-4 hover:cursor-default">
				{transcript.replace(/(\r\n|\n|\r)/gm, "") ? (
					transcript.split(" ").map((word, key) => {
						return (
							<span
								className="flex items-center justify-center hover:text-white"
								key={key}
								onClick={(e) => handleWordSelect(e)}
							>
								{word}&nbsp;
							</span>
						);
					})
				) : (
					<div className="w-full h-full flex justify-center items-center text-gray-600">
						<p>No transcript available</p>
					</div>
				)}
			</div>
			<p className="text-white self-center">
				Click on word to search on ChatGPT.{" "}
			</p>
			<div className="flex flex-row justify-center items-center space-x-4">
				<button
					className="text-xl p-2 px-4 border border-white rounded-full opacity-75 hover:opacity-100"
					onClick={() => handleOptionSelect("translate")}
				>
					Translate
				</button>
				<button
					className="text-xl p-2 px-4 border border-white rounded-full opacity-75 hover:opacity-100"
					onClick={() => handleOptionSelect("summarize")}
				>
					Summarize
				</button>
				<button
					className="text-xl p-2 px-4 border border-white rounded-full opacity-75 hover:opacity-100"
					onClick={() => handleOptionSelect("assess")}
				>
					Assess
				</button>
			</div>
		</div>
	);
};

export default TranscriptSection;
