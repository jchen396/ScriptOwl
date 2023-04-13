import React from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import SummarizeIcon from "@mui/icons-material/Summarize";
import QuizIcon from "@mui/icons-material/Quiz";

interface Props {
	setService: React.Dispatch<React.SetStateAction<string>>;
	service: string;
}

const Services: React.FC<Props> = ({ setService, service }) => {
	return (
		<div className="basis-1/2 flex flex-col items-center justify-center space-y-4">
			<h4 className="text-4xl">
				Join now and gain access to our platform services!{" "}
			</h4>
			<div className="w-full grid grid-cols-3 gap-10 ">
				<div
					className={`flex flex-col items-center justify-start space-y-4 rounded-lg p-4 bg-gray-700 hover:cursor-default ${
						service === "translation"
							? "bg-white text-black"
							: "hover:opacity-75 shadow-white shadow hover:shadow-none "
					}`}
					onClick={() => setService("translation")}
				>
					<TranslateIcon sx={{ fontSize: 40 }} />
					<h2 className="text-2xl">Translation</h2>
					<hr className="border border-gray-400 w-full" />
				</div>
				<div
					className={`flex flex-col items-center justify-start space-y-4 rounded-lg p-4 bg-gray-700 hover:cursor-default ${
						service === "summarize"
							? "bg-white text-black"
							: "hover:opacity-75 shadow-white shadow hover:shadow-none "
					}`}
					onClick={() => setService("summarize")}
				>
					<SummarizeIcon sx={{ fontSize: 40 }} />
					<h2 className="text-2xl">Summarization</h2>
					<hr className="border border-gray-400 w-full" />
				</div>
				<div
					className={`flex flex-col items-center justify-start space-y-4 rounded-lg p-4 bg-gray-700 hover:cursor-default ${
						service === "assessment"
							? "bg-white text-black"
							: "hover:opacity-75 shadow-white shadow hover:shadow-none "
					}`}
					onClick={() => setService("assessment")}
				>
					<QuizIcon sx={{ fontSize: 40 }} />
					<h2 className="text-2xl">Assessment</h2>
					<hr className="border border-gray-400 w-full" />
				</div>
			</div>
		</div>
	);
};

export default Services;
