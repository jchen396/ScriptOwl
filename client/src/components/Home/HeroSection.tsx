import Image from "next/image";
import React from "react";

type Props = {};

const HeroSection: React.FunctionComponent<Props> = () => {
	return (
		<div className="h-screen w-full sm:w-3/4 p-10 flex flex-col-reverse xl:flex-row items-center justify-between space-y-4 md:space-x-4 ">
			<div className="basis-1/2 flex flex-col items-start justify-start space-y-4 ">
				<h2 className="text-4xl md:text-7xl font-bold ">
					Your Video Content{" "}
					<span className="text-blue-600">Revolutionized</span>
				</h2>
				<p className="text-lg md:text-xl text-gray-700">
					Experience smarter video learning with our GPT 3.5 powered
					features - translations, summaries, and quizzes from video
					transcripts.
				</p>
			</div>
			<div className="w-full md:w-3/4 lg:w-3/5 xl:w-full basis-1/2 flex justify-center items-center ">
				<Image
					className="w-full h-full rounded-full"
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
