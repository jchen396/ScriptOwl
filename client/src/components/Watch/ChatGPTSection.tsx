import React from "react";

interface Props {
	wordSelected: string | null;
	chatReply: string | null;
	chatLoading: boolean;
}
const ChatGPTSection: React.FC<Props> = ({
	wordSelected,
	chatReply,
	chatLoading,
}) => {
	return (
		<div className="h-4/5 w-full flex flex-col space-y-4">
			<div className="basis-4/5 text-gray-600 flex justify-center items-center border-2 bg-transparent border-gray-800 rounded-lg overflow-auto p-4 hover:cursor-default">
				{chatLoading ? (
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
				) : (
					<div className="flex flex-col justify-center items-center space-y-4 text-gray-400">
						<h2>
							What is{" "}
							<span className="text-white">{wordSelected}</span>?
						</h2>
						<p>{chatReply}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatGPTSection;
