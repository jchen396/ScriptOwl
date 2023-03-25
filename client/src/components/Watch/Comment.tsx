import Image from "next/image";
import React, { useState } from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { IComment, IPost, IUser } from "../../../../types/types";
import { useMutation } from "@apollo/client";
import { LIKE_COMMENT } from "@/graphql/mutations/likeComment";
import { DISLIKE_COMMENT } from "@/graphql/mutations/dislikeComment";
import { UNLIKE_COMMENT } from "@/graphql/mutations/unlikeComment";
import { UNDISLIKE_COMMENT } from "@/graphql/mutations/undislikeComment";

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
	const [likes, setLikes] = useState<number>(comment.likes);
	const [dislikes, setDislikes] = useState<number>(comment.dislikes);
	const [userLiked, setUserLiked] = useState<boolean>(
		currentUser.likedCommentsIds.includes(comment.id)
	);
	const [userDisliked, setUserDisliked] = useState<boolean>(
		currentUser.dislikedCommentsIds.includes(comment.id)
	);
	const [likeComment] = useMutation(LIKE_COMMENT);
	const [unlikeComment] = useMutation(UNLIKE_COMMENT);
	const [dislikeComment] = useMutation(DISLIKE_COMMENT);
	const [undislikeComment] = useMutation(UNDISLIKE_COMMENT);
	const onLikeComment = () => {
		if (userLiked) {
			unlikeComment({
				variables: {
					postId: post.id,
					userId: currentUser.id,
					commentId: comment.id,
				},
			});
			setLikes((likes) => likes - 1);
			setUserLiked(false);
		} else {
			if (userDisliked) {
				undislikeComment({
					variables: {
						postId: post.id,
						userId: currentUser.id,
						commentId: comment.id,
					},
				});
				setDislikes((dislikes) => dislikes - 1);
				setUserDisliked(false);
			}
			likeComment({
				variables: {
					postId: post.id,
					userId: currentUser.id,
					commentId: comment.id,
				},
			});
			setLikes((likes) => likes + 1);
			setUserLiked(true);
		}
	};
	const onDislikeComment = () => {
		if (userDisliked) {
			undislikeComment({
				variables: {
					postId: post.id,
					userId: currentUser.id,
					commentId: comment.id,
				},
			});
			setDislikes((dislikes) => dislikes - 1);
			setUserDisliked(false);
		} else {
			if (userLiked) {
				unlikeComment({
					variables: {
						postId: post.id,
						userId: currentUser.id,
						commentId: comment.id,
					},
				});
				setLikes((likes) => likes - 1);
				setUserLiked(false);
			}
			dislikeComment({
				variables: {
					postId: post.id,
					userId: currentUser.id,
					commentId: comment.id,
				},
			});
			setDislikes((dislikes) => dislikes + 1);
			setUserDisliked(true);
		}
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
							className={`hover:cursor-pointer ${
								userLiked
									? "hover:text-blue-400 text-blue-600 "
									: "hover:text-white text-gray-400"
							}`}
							onClick={onLikeComment}
						>
							<ThumbUpOffAltIcon />
						</div>

						<p>{likes}</p>
						<div
							className={`hover:cursor-pointer ${
								userDisliked
									? "hover:text-red-400 text-red-600 "
									: "hover:text-white text-gray-400"
							}`}
							onClick={onDislikeComment}
						>
							<ThumbDownOffAltIcon />
						</div>

						<p>{dislikes}</p>
					</div>
				</div>
			</div>
			<hr className="border-gray-800 opacity-75" />
		</>
	);
};

export default Comment;
