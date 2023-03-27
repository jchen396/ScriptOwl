import { getTimeDiff } from "@/functions/getTimeDiff";
import { COMMENT_POST } from "@/graphql/mutations/commentPost";
import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { IPost, IUser } from "../../../../types/types";
import Comment from "./Comment";

type Props = {
	post: IPost;
	currentUser: IUser;
	refreshUserData: () => Promise<void>;
	refreshSSRProps: () => void;
};

const CommentSection: React.FunctionComponent<Props> = ({
	post,
	currentUser,
	refreshUserData,
	refreshSSRProps,
}) => {
	const [isCommenting, setIsCommenting] = useState<boolean>(false);
	const [hasInput, setHasInput] = useState<boolean>();
	const [commentPost] = useMutation(COMMENT_POST);
	const onCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const comment = e.currentTarget.comment.value;
		e.currentTarget.comment.value = "";
		const { data } = await commentPost({
			variables: {
				postId: post.id,
				commenter: currentUser.id,
				comment,
			},
		});
		setHasInput(false);
		setIsCommenting(true);
		refreshSSRProps();
	};
	useEffect(() => {
		setIsCommenting(false);
	}, [post]);
	return (
		<div className="basis-1/3 h-full w-full flex flex-col justify-center items-center text-white space-y-4">
			<h2 className="text-2xl">{post.comments.length} Comments</h2>
			<div className="h-4/5 w-full flex flex-col space-y-4">
				<div className="basis-4/5 text-white border-2 bg-transparent border-gray-800 rounded-lg overflow-auto">
					{post.comments.length ? (
						post.comments
							.slice(0)
							.reverse()
							.map((comment, key) => {
								// convert time difference between current time and time when comment was posted
								const { timeNumber, timeWord } = getTimeDiff(
									parseInt(comment.createdAt.date)
								);
								return (
									<div key={key}>
										<Comment
											timeNumber={timeNumber}
											timeWord={timeWord}
											post={post}
											currentUser={currentUser}
											comment={comment}
											refreshUserData={refreshUserData}
										/>
									</div>
								);
							})
					) : (
						<div className="w-full h-full flex justify-center items-center text-gray-600">
							<p>No comments yet</p>
						</div>
					)}
				</div>
				<form
					onSubmit={(e) => onCommentHandler(e)}
					className="basis-auto w-full flex flex-row justify-center items-center space-x-2"
				>
					<input
						type="text"
						id="comment"
						name="comment"
						placeholder="Add a comment..."
						className="w-full h-auto p-2 bg-transparent border-gray-800 border-b-2"
						onChange={(e) => {
							e.target.value
								? setHasInput(true)
								: setHasInput(false);
						}}
					/>
					<button
						className={`border-2 py-2 px-4 rounded-full ${
							hasInput
								? "border-blue-700 hover:bg-blue-700 text-white "
								: "border-gray-600 text-gray-400 hover:cursor-not-allowed"
						} `}
						type="submit"
						disabled={!hasInput}
					>
						{isCommenting ? "..." : "Comment"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CommentSection;
