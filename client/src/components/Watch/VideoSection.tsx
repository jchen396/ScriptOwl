import { IPost } from "@/types/types";
import React from "react";
import ReactPlayer from "react-player";

type Props = {
	post: IPost;
	timeNumber?: string;
	timeWord?: string;
};

const VideoSection: React.FunctionComponent<Props> = ({
	post,
	timeNumber,
	timeWord,
}) => {
	return (
		<div>
			<div className="basis-2/3 w-full h-full flex justify-center items-center">
				<div className="flex flex-col justify-center items-center space-y-2">
					<ReactPlayer
						url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
						width="90%"
						height="auto"
						controls={true}
					/>
					<div className="w-[90%] flex flex-row justify-start items-center space-x-4 text-white text-2xl">
						<p>{post.views} views</p>
						<span>&middot;</span>
						<p>
							{timeNumber} {timeWord} ago
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoSection;
