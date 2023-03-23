import { getTimeDiff } from "@/functions/getTimeDiff";
import { INCREMENT_VIEW_COUNT } from "@/graphql/mutations/incrementViewCount";
import { IPost } from "@/types/types";
import { useMutation } from "@apollo/client";
import React from "react";
import VideoPost from "./VideoPost";

interface Props {
	posts: IPost[];
}

const VideoGrid: React.FunctionComponent<Props> = ({ posts }) => {
	const [incrementViewCount] = useMutation(INCREMENT_VIEW_COUNT);
	return (
		<div>
			<h1 className="text-4xl font-medium text-slate-100">Home</h1>
			<div className="grid grid-cols-5 gap-4">
				{posts &&
					posts.map((post: IPost, key: number) => {
						const { timeNumber, timeWord } = getTimeDiff(
							parseInt(post.createdAt.date)
						);
						return (
							<VideoPost
								post={post}
								key={key}
								timeNumber={timeNumber}
								timeWord={timeWord}
								incrementViewCount={incrementViewCount}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default VideoGrid;
