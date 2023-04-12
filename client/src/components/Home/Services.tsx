import React from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import SummarizeIcon from "@mui/icons-material/Summarize";
import QuizIcon from "@mui/icons-material/Quiz";

interface Props {
	setService: React.Dispatch<React.SetStateAction<string>>;
}

const Services: React.FC<Props> = ({ setService }) => {
	return (
		<div className="basis-1/2 flex flex-col items-center justify-center space-y-4">
			<h4 className="text-4xl">
				Join now and gain access to our platform services!{" "}
			</h4>
			<div className="grid grid-cols-3 gap-10 ">
				<div
					className="flex flex-col items-center justify-start space-y-4 rounded-lg p-4 bg-gray-700 hover:opacity-75 hover:cursor-default"
					onClick={() => setService("translation")}
				>
					<TranslateIcon sx={{ fontSize: 40 }} />
					<h2 className="text-2xl">Translation</h2>
					<hr className="border border-gray-400 w-full" />
					<p className="text-lg text-gray-200">
						With our built-in translation tool, you can easily
						translate any video into the language of your choice.
						This means that you can enjoy content from all over the
						world, regardless of the language it was originally
						created in.
					</p>
				</div>
				<div
					className="flex flex-col items-center justify-start space-y-4 rounded-lg p-4 bg-gray-700 hover:opacity-75 hover:cursor-default"
					onClick={() => setService("summarize")}
				>
					<SummarizeIcon sx={{ fontSize: 40 }} />
					<h2 className="text-2xl">Summarization</h2>
					<hr className="border border-gray-400 w-full" />
					<p className="text-lg text-gray-200">
						Short on time? No problem. Our platform creates
						summaries of the videos you watch, so you can get the
						gist of the content without watching the whole thing.
						Never miss a key point, even when you&apos;re in a
						hurry.
					</p>
				</div>
				<div
					className="flex flex-col items-center justify-start space-y-4 rounded-lg p-4 bg-gray-700 hover:opacity-75 hover:cursor-default"
					onClick={() => setService("assessment")}
				>
					<QuizIcon sx={{ fontSize: 40 }} />
					<h2 className="text-2xl">Assessment</h2>
					<hr className="border border-gray-400 w-full" />
					<p className="text-lg text-gray-200">
						Want to test your knowledge of the video content? Our
						platform creates quizzes based on video transcripts, so
						you can measure your understanding and retention of the
						material. Plus, it&apos;s a fun way to learn and
						challenge yourself.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Services;
