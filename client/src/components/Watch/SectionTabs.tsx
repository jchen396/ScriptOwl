import React from "react";
import { IPost } from "../../../../types/types";

interface Props {
	post: IPost;
	section: string;
	setSection: React.Dispatch<React.SetStateAction<string>>;
	service: string;
}

const SectionTabs: React.FC<Props> = ({
	post,
	section,
	setSection,
	service,
}) => {
	return (
		<div className="flex flex-row justify-center items-center">
			<button
				className={`text-xl border-2 p-2 px-4 rounded-t-xl ${
					section === "comment"
						? "border-white opacity-100"
						: "border-gray-800 opacity-50"
				} hover:opacity-100`}
				onClick={() => setSection("comment")}
			>
				{post.comments.length} Comments
			</button>
			<button
				className={`text-xl border-2 p-2 px-4 rounded-t-xl ${
					section === "transcript"
						? "border-white border-2 opacity-100"
						: "border-gray-800 opacity-50"
				} hover:opacity-100`}
				onClick={() => setSection("transcript")}
			>
				Transcript
			</button>
			<button
				className={`text-xl border-2 p-2 px-4 rounded-t-xl ${
					section === "ChatGPT"
						? "border-white opacity-100"
						: "border-gray-800 opacity-50"
				} hover:opacity-100 ${service ? "block" : "hidden"}`}
				onClick={() => setSection("ChatGPT")}
			>
				ChatGPT
			</button>
		</div>
	);
};

export default SectionTabs;
