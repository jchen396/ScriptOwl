import { getTimeDiff } from "@/functions/getTimeDiff";
import { INCREMENT_VIEW_COUNT } from "@/graphql/mutations/incrementViewCount";
import { useMutation } from "@apollo/client";
import { IPost } from "../../../../types/types";
import React from "react";
import VideoPost from "./../Explore/VideoPost";

interface Props {
	posts: IPost[];
}

const VideoGrid: React.FunctionComponent<Props> = ({ posts }) => {
	const [incrementViewCount] = useMutation(INCREMENT_VIEW_COUNT);
	console.log("test");
	return (
		<div className="w-full h-3/4 overflow-auto">
			{posts &&
				posts.map((post: IPost, key: number) => {
					const { timeNumber, timeWord } = getTimeDiff(
						parseInt(post.createdAt.date)
					);
					return (
						<div
							key={key}
							className="group w-full hover:bg-gray-800 p-2 hover:cursor-pointer rounded-lg"
							onClick={() => {
								incrementViewCount({
									variables: {
										postId: post.id,
										views: post.views + 1,
										publisherId: post.publisher.id
											? post.publisher.id
											: null,
									},
								});
							}}
						>
							<VideoPost
								post={post}
								timeNumber={timeNumber}
								timeWord={timeWord}
							/>
						</div>
					);
				})}
		</div>
	);
};

export default VideoGrid;
