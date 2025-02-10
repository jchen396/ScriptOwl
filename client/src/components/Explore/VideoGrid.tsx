import { getTimeDiff } from "@/functions/getTimeDiff";
import { INCREMENT_VIEW_COUNT } from "@/graphql/mutations/incrementViewCount";
import { useMutation } from "@apollo/client";
import { IPost } from "../../../../types/types";
import React from "react";
import VideoPost from "./VideoPost";
import { ADD_WATCH_HISTORY } from "@/graphql/mutations/addWatchHistory";
import { useSelector } from "react-redux";

interface Props {
	posts: IPost[];
	options?: string[];
	setShowDeleteMsg?: React.Dispatch<React.SetStateAction<boolean>>;
	setShowEditMsg?: React.Dispatch<React.SetStateAction<boolean>>;
	setTargetPostId?: React.Dispatch<React.SetStateAction<string>>;
	setTargetPostPublisherId?: React.Dispatch<React.SetStateAction<string>>;
	setTargetPostTitle?: React.Dispatch<React.SetStateAction<string>>;
	setTargetPostDesc?: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
	setTargetPostCategory?: React.Dispatch<
		React.SetStateAction<string | undefined>
	>;
}

const VideoGrid: React.FunctionComponent<Props> = ({
	posts,
	options,
	setShowDeleteMsg,
	setShowEditMsg,
	setTargetPostId,
	setTargetPostPublisherId,
	setTargetPostTitle,
	setTargetPostDesc,
	setTargetPostCategory,
}) => {
	const [incrementViewCount] = useMutation(INCREMENT_VIEW_COUNT);
	const [addWatchHistory] = useMutation(ADD_WATCH_HISTORY);
	const { currentUser } = useSelector((state: any) => state.user);
	return (
		<div className="w-full p-4 flex flex-col justify-center items-center space-y-4">
			<div className="w-full grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
				{posts &&
					posts?.map((post: IPost, key: number) => {
						const { timeNumber, timeWord } = getTimeDiff(
							parseInt(post.createdAt.date)
						);
						return (
							<div
								key={key}
								className="relative group w-full hover:bg-gray-800 p-2 hover:cursor-pointer rounded-lg"
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
									if (currentUser) {
										addWatchHistory({
											variables: {
												userId: currentUser.id,
												postId: post.id,
											},
										});
									}
								}}
							>
								<VideoPost
									post={post}
									timeNumber={timeNumber}
									timeWord={timeWord}
									options={options}
									setShowDeleteMsg={setShowDeleteMsg}
									setShowEditMsg={setShowEditMsg}
									setTargetPostId={setTargetPostId}
									setTargetPostPublisherId={
										setTargetPostPublisherId
									}
									setTargetPostTitle={setTargetPostTitle}
									setTargetPostDesc={setTargetPostDesc}
									setTargetPostCategory={
										setTargetPostCategory
									}
								/>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default VideoGrid;
