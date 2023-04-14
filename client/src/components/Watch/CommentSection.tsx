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
	const [visibleComments, setVisibleComments] = useState<number>(0);
	const [hasInput, setHasInput] = useState<boolean>();
	const [commentPost] = useMutation(COMMENT_POST);
	const onCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const comment = e.currentTarget.comment.value;
		e.currentTarget.comment.value = "";
		await commentPost({
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
	const loadComments = () => {
		let loadAmount = 20;
		if (post.comments.length < visibleComments + 40) {
			loadAmount = post.comments.length - visibleComments;
		}
		setVisibleComments((state) => state + loadAmount);
	};
	useEffect(() => {
		setIsCommenting(false);
	}, [post]);
	useEffect(() => {
		loadComments();
	}, []);
	return (
		<div className="h-4/5 w-full flex flex-col space-y-4">
			<div className="basis-4/5 text-white border-2 bg-transparent border-gray-800 rounded-lg overflow-y-scroll">
				{post.comments.length ? (
					post.comments
						.slice(
							post.comments.length - visibleComments,
							post.comments.length
						)
						.reverse()
						.map((comment) => {
							// convert time difference between current time and time when comment was posted
							const { timeNumber, timeWord } = getTimeDiff(
								parseInt(comment.createdAt.date)
							);
							return (
								<div key={comment.id}>
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
				{visibleComments < post.comments.length && (
					<button
						className="w-full p-2 text-gray-400 flex items-center justify-center bg-gray-900 hover:bg-gray-800 hover:text-white rounded"
						onClick={loadComments}
					>
						Load more comments (
						{post.comments.length - visibleComments})
					</button>
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
						e.target.value ? setHasInput(true) : setHasInput(false);
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
					{isCommenting ? (
						<div className="w-full flex flex-row justify-center items-center space-x-4">
							<div role="status">
								<div
									className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
									role="status"
								>
									<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
										Loading...
									</span>
								</div>
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					) : (
						<span>Comment</span>
					)}
				</button>
			</form>
		</div>
	);
};

export default CommentSection;
