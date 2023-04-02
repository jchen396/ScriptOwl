import React from "react";

interface Props {
	transcript: string;
}

const TranscriptSection: React.FC<Props> = ({ transcript }) => {
	return (
		<div className="h-4/5 w-full flex flex-col space-y-4">
			<div className="basis-4/5 text-white border-2 bg-transparent border-gray-800 rounded-lg overflow-auto p-4">
				{transcript ? transcript : "Transcript not available"}
			</div>
		</div>
	);
};

export default TranscriptSection;
