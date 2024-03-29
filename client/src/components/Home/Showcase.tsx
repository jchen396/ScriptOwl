import Image from "next/image";
import React from "react";

interface Props {
	service: string;
}

const Showcase: React.FC<Props> = ({ service }) => {
	const getServiceInformation = () => {
		if (service === "translation") {
			return (
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Image
						className="basis-1/2 w-full h-2/3 "
						src="/gif/translation.gif"
						alt="translation_showcase"
						width={1000}
						height={562}
					/>
					<p className="basis-1/2 flex justify-center items-center">
						With our built-in translation tool, you can easily
						translate any video into the language of your choice.
						This means that you can enjoy content from all over the
						world, regardless of the language it was originally
						created in.
					</p>
				</div>
			);
		} else if (service === "summarize") {
			return (
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Image
						className="basis-1/2 w-full h-2/3 "
						src="/gif/summary.gif"
						alt="translation_showcase"
						width={1000}
						height={562}
					/>
					<p className="basis-1/2 flex justify-center items-center">
						Short on time? No problem. Our platform creates
						summaries of the videos you watch, so you can get the
						gist of the content without watching the whole thing.
						Never miss a key point, even when you&apos;re in a
						hurry.
					</p>
				</div>
			);
		} else if (service === "assessment") {
			return (
				<div className="w-full h-full flex flex-col justify-center items-center">
					<Image
						className="basis-1/2 w-full h-2/3 "
						src="/gif/assess.gif"
						alt="translation_showcase"
						width={1000}
						height={562}
					/>
					<p className="basis-1/2 flex justify-center items-center">
						Want to test your knowledge of the video content? Our
						platform creates quizzes based on video transcripts, so
						you can measure your understanding and retention of the
						material. Plus, it&apos;s a fun way to learn and
						challenge yourself.
					</p>
				</div>
			);
		}
	};
	return (
		<div className="basis-2/3 w-full sm:w-3/4 lg:w-1/2 flex justify-center items-center text-gray-200 text-md sm:text-lg p-4">
			{service ? (
				<div className="w-full h-full flex ">
					<div className="flex justify-center items-center p-4">
						{getServiceInformation()}
					</div>
				</div>
			) : (
				<p>
					Click on one of the service above to view more information.
				</p>
			)}
		</div>
	);
};

export default Showcase;
