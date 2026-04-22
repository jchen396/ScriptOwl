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
		<div className="flex flex-col items-center justify-center space-y-16 w-full max-w-6xl mx-auto py-12 px-4 z-10">
			<h4 className="text-3xl sm:text-5xl font-light text-center leading-tight">
				<Link
					className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transition-colors"
					href={"/register"}
				>
					Join now
				</Link>{" "}
				<span className="text-gray-300">and supercharge your learning!</span>
			</h4>
			<div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
				{[
					{ id: "translation", icon: <TranslateIcon sx={{ fontSize: 48 }} />, title: "Real-Time Translation", desc: "Break language barriers instantly." },
					{ id: "summarize", icon: <SummarizeIcon sx={{ fontSize: 48 }} />, title: "Smart Summarization", desc: "Get the key points in seconds." },
					{ id: "assessment", icon: <QuizIcon sx={{ fontSize: 48 }} />, title: "AI Assessment", desc: "Test your knowledge with auto-quizzes." }
				].map((item) => (
					<div
						key={item.id}
						className={`group relative flex flex-col items-center text-center p-8 rounded-3xl cursor-pointer transition-all duration-500 ${
							service === item.id
								? "bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-2 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)] scale-105"
								: "bg-gray-800/40 backdrop-blur-md border border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600 hover:-translate-y-2 hover:shadow-2xl"
						}`}
						onClick={() => setService(item.id)}
					>
						<div className={`mb-6 p-4 rounded-2xl ${service === item.id ? "bg-blue-500/20 text-blue-400" : "bg-gray-700/50 text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-500/10"} transition-colors duration-300`}>
							{item.icon}
						</div>
						<h2 className={`text-2xl font-bold mb-3 ${service === item.id ? "text-white" : "text-gray-200"}`}>{item.title}</h2>
						<p className="text-gray-400 font-medium">{item.desc}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Services;
