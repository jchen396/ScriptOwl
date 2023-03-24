import Image from "next/image";
import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { IComment, IPost, IUser } from "../../../../types/types";
import { useMutation } from "@apollo/client";
import { LIKE_COMMENT } from "@/graphql/mutations/likeComment";

type Props = {
	comment: IComment;
	timeNumber?: string;
	timeWord?: string;
	post: IPost;
	currentUser: IUser;
};

const Comment: React.FunctionComponent<Props> = ({
	comment,
	timeNumber,
	timeWord,
	post,
	currentUser,
}) => {
	const [likeComment] = useMutation(LIKE_COMMENT);
	const onLikeComment = () => {
		likeComment({
			variables: {
				postId: post.id,
				userId: currentUser.id,
				commentId: comment.id,
			},
		});
	};
	return (
		<>
			<div className="flex flex-row justify-start items-center p-2 space-x-4">
				<Image
					height={32}
					width={32}
					className="w-10 h-10 rounded-full"
					src={`http://localhost:8080/images/${comment.commenter.avatarKey}`}
					alt="commenter photo"
				/>
				<div className="flex flex-col text-gray-400">
					<div className="flex flex-row items-center space-x-2">
						<h2 className="text-xl hover:underline hover:text-white hover:cursor-pointer">
							{comment.commenter.username}
						</h2>
						{timeNumber && timeWord ? (
							<p className="text-gray-600">
								{timeNumber} {timeWord} ago
							</p>
						) : (
							<p className="text-gray-600">Just now</p>
						)}
					</div>

					<p>{comment.comment}</p>
					<div className="text-sm flex flex-row items-center space-x-2">
						<div
							className="hover:text-white hover:cursor-pointer"
							onClick={onLikeComment}
						>
							<ThumbUpOffAltIcon />
						</div>

						<p>{comment.likes}</p>
					</div>
				</div>
			</div>
			<hr className="border-gray-800 opacity-75" />
		</>
	);
};

export default Comment;
