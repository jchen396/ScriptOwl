import React from "react";

interface Props {
	wordSelected: string | null;
}

const ChatGPTSection: React.FC<Props> = ({ wordSelected }) => {
	return (
		<div className="h-4/5 w-full flex flex-col space-y-4">
			<div className="basis-4/5 text-gray-600 flex flex-wrap border-2 bg-transparent border-gray-800 rounded-lg overflow-auto p-4 hover:cursor-default">
				{wordSelected}
			</div>
		</div>
	);
};

export default ChatGPTSection;
