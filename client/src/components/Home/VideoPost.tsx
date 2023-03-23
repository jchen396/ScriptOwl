import { IPost } from "@/types/types";
import React from "react";
import ReactPlayer from "react-player";

type Props = {
	post: IPost;
	timeNumber?: string;
	timeWord?: string;
};

const VideoPost: React.FunctionComponent<Props> = ({
	post,
	timeNumber,
	timeWord,
}) => {
	return (
		<>
			<div className="border-2 border-gray-800 rounded">
				<ReactPlayer
					url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
					width="100%"
					height="150px"
				/>
			</div>

			<p className="text-white text-xl bold">{post.title}</p>
			<p className="text-gray-400 text-lg">{post.publisher.username}</p>
			<div className="flex flex-row justify-start items-center text-gray-400 text-sm space-x-2">
				<p>{post.views} views</p>
				<span className="text-md">&middot;</span>
				<p className="">
					{timeNumber} {timeWord} ago
				</p>
			</div>
		</>
	);
};

export default VideoPost;
