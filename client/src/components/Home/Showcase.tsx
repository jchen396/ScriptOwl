import Image from "next/image";
import React from "react";

interface Props {
	service: string;
}

const Showcase: React.FC<Props> = ({ service }) => {
	const getServiceInformation = () => {
		if (service === "translation") {
			return (
				<div className="w-full flex flex-col xl:flex-row justify-center items-center gap-10 animate-fade-in">
					<div className="basis-1/2 w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
						<Image className="w-full h-auto object-cover transform transition-transform hover:scale-105 duration-700" src="/gif/translation.gif" alt="translation_showcase" width={1000} height={562} />
					</div>
					<div className="basis-1/2 flex flex-col space-y-4">
						<h3 className="text-3xl font-bold text-white">Break the Language Barrier</h3>
						<p className="text-xl text-gray-400 leading-relaxed">
							With our built-in translation tool, you can easily translate any video into the language of your choice. Enjoy content from all over the world, regardless of its original language.
						</p>
					</div>
				</div>
			);
		} else if (service === "summarize") {
			return (
				<div className="w-full flex flex-col xl:flex-row justify-center items-center gap-10 animate-fade-in">
					<div className="basis-1/2 w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
						<Image className="w-full h-auto object-cover transform transition-transform hover:scale-105 duration-700" src="/gif/summary.gif" alt="summary_showcase" width={1000} height={562} />
					</div>
					<div className="basis-1/2 flex flex-col space-y-4">
						<h3 className="text-3xl font-bold text-white">Save Time, Learn Faster</h3>
						<p className="text-xl text-gray-400 leading-relaxed">
							Short on time? No problem. Our platform instantly generates comprehensive summaries of the videos you watch. Grasp the gist of the content without watching the whole thing. Never miss a key point again.
						</p>
					</div>
				</div>
			);
		} else if (service === "assessment") {
			return (
				<div className="w-full flex flex-col xl:flex-row justify-center items-center gap-10 animate-fade-in">
					<div className="basis-1/2 w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
						<Image className="w-full h-auto object-cover transform transition-transform hover:scale-105 duration-700" src="/gif/assess.gif" alt="assess_showcase" width={1000} height={562} />
					</div>
					<div className="basis-1/2 flex flex-col space-y-4">
						<h3 className="text-3xl font-bold text-white">Test Your Knowledge</h3>
						<p className="text-xl text-gray-400 leading-relaxed">
							Validate your understanding with automated AI assessments. Our platform generates interactive quizzes directly from video transcripts to help you measure retention and challenge yourself.
						</p>
					</div>
				</div>
			);
		}
	};
	return (
		<div className="w-full max-w-6xl flex justify-center items-center mt-12 p-4 z-10">
			{service ? (
				<div className="w-full bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 p-8 md:p-12 rounded-3xl shadow-2xl transition-all duration-500">
					{getServiceInformation()}
				</div>
			) : (
				<div className="w-full py-16 flex justify-center items-center bg-gray-800/10 rounded-3xl border border-gray-800 border-dashed">
					<p className="text-2xl text-gray-500 font-light italic">
						Click on a service above to explore its features.
					</p>
				</div>
			)}
		</div>
	);
};

export default Showcase;
