import { getReply } from "@/functions/openai_function/getReply";
import React from "react";

interface Props {
	transcript: string;
	setWordSelected: React.Dispatch<React.SetStateAction<string | null>>;
	setSection: React.Dispatch<React.SetStateAction<string>>;
	setChatReply: React.Dispatch<React.SetStateAction<string | null>>;
	setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TranscriptSection: React.FC<Props> = ({
	transcript,
	setWordSelected,
	setSection,
	setChatReply,
	setChatLoading,
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
			setSection("ChatGPT");
			const reply = await getReply(highlightedWord);
			setChatReply(reply);
			setChatLoading(false);
		}
	};
	return (
		<div className="h-4/5 w-full flex flex-col space-y-4">
			<div className="basis-4/5 text-gray-600 flex flex-wrap border-2 bg-transparent border-gray-800 rounded-lg overflow-auto p-4 hover:cursor-default">
				{transcript ? (
					transcript.split(" ").map((word, key) => {
						return (
							<span
								className="hover:text-white"
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
		</div>
	);
};

export default TranscriptSection;
