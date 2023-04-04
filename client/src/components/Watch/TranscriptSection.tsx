import React from "react";

interface Props {
	transcript: string;
	setWordSelected: React.Dispatch<React.SetStateAction<string | null>>;
	setSection: React.Dispatch<React.SetStateAction<string>>;
}

const TranscriptSection: React.FC<Props> = ({
	transcript,
	setWordSelected,
	setSection,
}) => {
	return (
		<div className="h-4/5 w-full flex flex-col space-y-4">
			<div className="basis-4/5 text-gray-600 flex flex-wrap border-2 bg-transparent border-gray-800 rounded-lg overflow-auto p-4 hover:cursor-default">
				{transcript ? (
					transcript.split(" ").map((word, key) => {
						return (
							<span
								className="hover:text-white"
								key={key}
								onClick={(e) => {
									setWordSelected(
										e.currentTarget.textContent
									);
									setSection("ChatGPT");
								}}
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
