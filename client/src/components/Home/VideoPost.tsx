import Link from "next/link";
import React from "react";
import ReactPlayer from "react-player";
import { IPost } from "../../../../types/types";

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
	const postLikeRatio = post.dislikes
		? Math.floor((post.likes / (post.likes + post.dislikes)) * 100)
		: 100;
	return (
		<>
			<Link
				href={{
					pathname: "/watch",
					query: { v: post.id },
				}}
			>
				<div className="relative border-2 border-gray-800 rounded">
					<ReactPlayer
						url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
						width="100%"
						height="150px"
						light={true}
					/>
					<div className="group-hover:opacity-50 absolute right-0 bottom-0 bg-black text-white text-md self-end">
						{Math.floor(post.duration / 60)}:{post.duration % 60}
					</div>
				</div>
				<div className="flex flex-row justify-between items-center">
					<p className="text-white text-xl bold">
						{post.title.length > 20
							? post.title.slice(0, 20) + "..."
							: post.title}
					</p>
					<p
						className={`${
							postLikeRatio > 50
								? "text-blue-600"
								: "text-red-600"
						}`}
					>
						{postLikeRatio}%
					</p>
				</div>

				<p className="text-gray-400 text-lg">
					{post.publisher.username}
				</p>
				<div className="flex flex-row justify-start items-center text-gray-400 text-sm space-x-2">
					<p>{post.views} views</p>
					<span className="text-md">&middot;</span>
					<p className="">
						{timeNumber} {timeWord} ago
					</p>
				</div>
			</Link>
		</>
	);
};

export default VideoPost;
