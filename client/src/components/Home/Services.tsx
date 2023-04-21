import React from "react";
import TranslateIcon from "@mui/icons-material/Translate";
import SummarizeIcon from "@mui/icons-material/Summarize";
import QuizIcon from "@mui/icons-material/Quiz";
import Link from "next/link";

interface Props {
	setService: React.Dispatch<React.SetStateAction<string>>;
	service: string;
}

const Services: React.FC<Props> = ({ setService, service }) => {
	return (
		<div className="basis-1/3 flex flex-col items-center justify-center space-y-10 ">
			<h4 className="text-2xl sm:text-4xl">
				<Link
					className="italic underline hover:text-blue-600"
					href={"/register"}
				>
					Join now
				</Link>{" "}
				and gain access to our platform services!{" "}
			</h4>
			<div className="w-full flex flex-col lg:flex-row gap-10 ">
				<div
					className={`basis-1/3 flex flex-row lg:flex-col items-center justify-center lg:justify-start space-y-4 rounded-lg p-2 sm:p-4 bg-gray-700 hover:cursor-default ${
						service === "translation"
							? "bg-white text-black"
							: "hover:opacity-75 shadow-white shadow hover:shadow-none "
					}`}
					onClick={() => setService("translation")}
				>
					<TranslateIcon sx={{ fontSize: 40 }} />
					<h2 className="text-xl sm:text-2xl">Translation</h2>
					<hr className="hidden lg:block border border-gray-400 w-full" />
				</div>
				<div
					className={`basis-1/3 flex flex-row lg:flex-col items-center justify-center lg:justify-start space-y-4 rounded-lg p-2 sm:p-4 bg-gray-700 hover:cursor-default ${
						service === "summarize"
							? "bg-white text-black"
							: "hover:opacity-75 shadow-white shadow hover:shadow-none "
					}`}
					onClick={() => setService("summarize")}
				>
					<SummarizeIcon sx={{ fontSize: 40 }} />
					<h2 className="text-xl sm:text-2xl">Summarization</h2>
					<hr className="hidden lg:block border border-gray-400 w-full" />
				</div>
				<div
					className={`basis-1/3 flex flex-row lg:flex-col items-center justify-center lg:justify-start space-y-4 rounded-lg p-2 sm:p-4 bg-gray-700 hover:cursor-default ${
						service === "assessment"
							? "bg-white text-black"
							: "hover:opacity-75 shadow-white shadow hover:shadow-none "
					}`}
					onClick={() => setService("assessment")}
				>
					<QuizIcon sx={{ fontSize: 40 }} />
					<h2 className="text-xl sm:text-2xl">Assessment</h2>
					<hr className="hidden lg:block border border-gray-400 w-full" />
				</div>
			</div>
		</div>
	);
};

export default Services;
