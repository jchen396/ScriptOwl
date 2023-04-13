import React from "react";

const HeroSection = () => {
	return (
		<div className="h-screen w-1/2 flex flex-row items-center justify-center">
			<div className="basis-1/2 flex flex-col items-start justify-start space-y-4 ">
				<h2 className="text-7xl font-bold ">
					Your Video Content Revolutionized
				</h2>
				<p className="text-xl text-gray-700">
					Experience smarter video learning with our GPT 3.5 powered
					features - translations, summaries, and quizzes from video
					transcripts.
				</p>
			</div>
			<div className="basis-1/2"></div>
		</div>
	);
};

export default HeroSection;
