import { getTimeDiff } from "@/functions/getTimeDiff";
import { IComment, IPost } from "@/types/types";
import React from "react";
import Comment from "./Comment";

type Props = {
	post: IPost;
	onCommentHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const CommentSection: React.FunctionComponent<Props> = ({
	post,
	onCommentHandler,
}) => {
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
									<Comment
										comment={comment}
										key={key}
										timeNumber={timeNumber}
										timeWord={timeWord}
									/>
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
						className="w-full h-auto p-2 bg-transparent border-gray-800 border-b-2 "
					/>
					<button
						className="border-2 border-blue-700 hover:bg-blue-700 text-white py-2 px-4 rounded-full "
						type="submit"
					>
						Comment
					</button>
				</form>
			</div>
		</div>
	);
};

export default CommentSection;
