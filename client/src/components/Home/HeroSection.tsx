import Image from "next/image";
import React from "react";

const HeroSection = () => {
	return (
		<div className="h-screen w-1/2 flex flex-row items-center justify-between space-x-4">
			<div className="basis-1/2 flex flex-col items-start justify-start space-y-4">
				<h2 className="text-7xl font-bold ">
					Your Video Content{" "}
					<span className="text-blue-600">Revolutionized</span>
				</h2>
				<p className="text-xl text-gray-700">
					Experience smarter video learning with our GPT 3.5 powered
					features - translations, summaries, and quizzes from video
					transcripts.
				</p>
			</div>
			<div className="basis-1/2">
				<Image
					className="w-full h-full  rounded-full "
					src="/img/cartoon_boy_video.png"
					alt="image_1"
					width={400}
					height={400}
				/>
			</div>
		</div>
	);
};

export default HeroSection;
