import Image from "next/image";
import React from "react";
import URLInput from "./URLInput";

type Props = {
	youtubeURL: string;
	setYoutubeURL: React.Dispatch<React.SetStateAction<string>>;
	setYoutubeTranscript: React.Dispatch<React.SetStateAction<string>>;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setWasTruncated: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeroSection: React.FunctionComponent<Props> = (props) => {
	return (
		<div className="min-h-[85vh] w-full sm:w-5/6 max-w-7xl mx-auto p-10 flex flex-col-reverse xl:flex-row items-center justify-center xl:justify-between gap-12 xl:gap-8 pt-24 xl:pt-10">
			<div className="basis-1/2 flex flex-col items-start justify-center space-y-6 z-10">
				<h1 className="text-5xl md:text-7xl xl:text-8xl font-extrabold tracking-tight leading-tight text-white drop-shadow-lg">
					Your Video Content <br/>
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
						Revolutionized
					</span>
				</h1>
				<p className="text-lg md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed">
					Experience smarter video learning powered by the state-of-the-art. Generate instant translations, deep summaries, and interactive quizzes from any video transcript.
				</p>
				<p className="text-gray-500 text-sm max-w-xl">
					⏱️ For best AI results, use videos <strong className="text-gray-400">under ~15 minutes</strong>.
				</p>
				<div className="pt-2 w-full">
					<URLInput {...props} />
				</div>
			</div>
			<div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:basis-1/2 flex justify-center items-center relative group">
				<div className="absolute inset-0 bg-blue-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
				<Image
					className="w-[85%] h-auto rounded-full shadow-2xl ring-4 ring-white/10 object-cover z-10 transition-transform duration-700 group-hover:scale-[1.03]"
					src="/img/cartoon_boy_video.png"
					alt="Hero Image"
					width={600}
					height={600}
					priority
				/>
			</div>
		</div>
	);
};

export default HeroSection;
