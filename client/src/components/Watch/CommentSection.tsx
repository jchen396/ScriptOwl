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
				publisherId: post.publisher.id,
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
		<div className="h-full w-full flex flex-col bg-black">
			{/* Comments list */}
			<div className="flex-1 overflow-y-auto hide-scrollbar">
				{post.comments.length ? (
					<div className="flex flex-col">
						{post.comments
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
							})}
						{visibleComments < post.comments.length && (
							<button
								className="mx-4 my-2 px-4 py-2 text-xs font-medium text-gray-400 bg-gray-800/40 hover:bg-gray-800/80 hover:text-white rounded-lg transition-all duration-200"
								onClick={loadComments}
							>
								Load more ({post.comments.length - visibleComments} remaining)
							</button>
						)}
					</div>
				) : (
					<div className="w-full h-full flex flex-col justify-center items-center py-16 gap-2">
						<div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mb-2">
							<svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
							</svg>
						</div>
						<p className="text-gray-500 text-sm font-medium">No comments yet</p>
						<p className="text-gray-600 text-xs">Be the first to comment</p>
					</div>
				)}
			</div>

			{/* Comment input */}
			{currentUser && (
				<div className="shrink-0 border-t border-gray-800/60 p-3">
					<form
						onSubmit={(e) => onCommentHandler(e)}
						className="flex items-center gap-2"
					>
						<input
							type="text"
							id="comment"
							name="comment"
							placeholder="Add a comment..."
							className="flex-1 px-4 py-2.5 text-sm text-white placeholder-gray-600 bg-gray-800/40 border border-gray-700/40 rounded-full outline-none focus:border-blue-500/50 focus:bg-gray-800/60 transition-all duration-200"
							onChange={(e) => {
								e.target.value
									? setHasInput(true)
									: setHasInput(false);
							}}
						/>
						<button
							className={`flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${
								hasInput && currentUser.isVerified
									? "bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/20"
									: "bg-gray-800/40 text-gray-600 cursor-not-allowed"
							}`}
							type="submit"
							disabled={!hasInput || !currentUser.isVerified}
						>
							{isCommenting ? (
								<div
									className="w-4 h-4 animate-spin rounded-full border-2 border-current border-r-transparent"
									role="status"
								>
									<span className="sr-only">Loading...</span>
								</div>
							) : (
								<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
									<path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
								</svg>
							)}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default CommentSection;
