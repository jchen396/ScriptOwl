import Link from "next/link";
import React from "react";
import ReactPlayer from "react-player";
import { IPost } from "../../../../types/types";
import Image from "next/image";

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
	console.log(
		`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${post.publisher.avatarKey}`
	);
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
						light={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}thumbnails/${post.thumbnail}`}
					/>
					<div className="group-hover:bg-transparent  absolute right-0 bottom-0 bg-black text-white text-md self-end">
						{Math.floor(post.duration / 60)}:{post.duration % 60}
					</div>
				</div>
				<div className="flex flex-row justify-between items-center">
					<h3 className="text-white text-xl bold">
						{post.title.length > 20
							? post.title.slice(0, 20) + "..."
							: post.title}
					</h3>
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
				<div className="flex flex-row justify-start items-center space-x-4">
					{post.publisher ? (
						<Image
							height={50}
							width={50}
							className="w-10 h-10 rounded-full"
							src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${post.publisher.avatarKey}`}
							alt="user photo"
						/>
					) : (
						<Image
							height={50}
							width={50}
							className="w-10 h-10 rounded-full"
							src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/1b22841673b252b100e68a9b0fc8aaeb`}
							alt="user photo"
						/>
					)}
					<div className="flex flex-col items-start justify-center">
						<p className="text-gray-400 text-lg">
							{post.publisher
								? post.publisher.username
								: "Deleted User"}
						</p>
						<div className="flex flex-row justify-start items-center text-gray-400 text-sm space-x-2">
							<p>{post.views} views</p>
							<span className="text-md">&middot;</span>
							<p className="">
								{timeNumber} {timeWord} ago
							</p>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default VideoPost;
