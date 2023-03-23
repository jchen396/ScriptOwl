import { IPost } from "@/types/types";
import {
	ApolloCache,
	DefaultContext,
	MutationFunctionOptions,
	OperationVariables,
} from "@apollo/client";
import Link from "next/link";
import React from "react";
import ReactPlayer from "react-player";

type Props = {
	post: IPost;
	key: number;
	timeNumber?: string;
	timeWord?: string;
	incrementViewCount: (
		options?:
			| MutationFunctionOptions<
					any,
					OperationVariables,
					DefaultContext,
					ApolloCache<any>
			  >
			| undefined
	) => Promise<any>;
};

const VideoPost: React.FunctionComponent<Props> = ({
	post,
	key,
	timeNumber,
	timeWord,
	incrementViewCount,
}) => {
	return (
		<>
			<div
				key={key}
				className="hover:bg-gray-800 p-2 hover:cursor-pointer rounded-lg"
				onClick={() => {
					incrementViewCount({
						variables: {
							postId: post.id,
							views: post.views + 1,
						},
					});
				}}
			>
				<Link
					href={{
						pathname: "/watch",
						query: { v: post.id },
					}}
				>
					<div className="border-2 border-gray-800 rounded">
						<ReactPlayer
							url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
							width="100%"
							height="150px"
						/>
					</div>

					<p className="text-white text-xl bold">{post.title}</p>
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
			</div>
		</>
	);
};

export default VideoPost;
