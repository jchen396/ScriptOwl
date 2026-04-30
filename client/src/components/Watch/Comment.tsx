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
import DeleteIcon from "@mui/icons-material/Delete";
import { DELETE_COMMENT } from "@/graphql/mutations/deleteComment";

type Props = {
	comment: IComment;
	timeNumber?: string;
	timeWord?: string;
	post: IPost;
	currentUser: IUser;
	refreshUserData: () => Promise<void>;
};

const Comment: React.FunctionComponent<Props> = ({
	comment,
	timeNumber,
	timeWord,
	post,
	currentUser,
	refreshUserData,
}) => {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [commentLikes, setCommentLikes] = useState<number>(comment.likes);
	const [commentDislikes, setCommentDislikes] = useState<number>(
		comment.dislikes
	);
	const [commentLiked, setCommentLiked] = useState<boolean>(
		currentUser?.likedCommentsIds.includes(comment.id)
	);
	const [commentDisliked, setCommentDisliked] = useState<boolean>(
		currentUser?.dislikedCommentsIds.includes(comment.id)
	);
	const [likeComment] = useMutation(LIKE_COMMENT);
	const [unlikeComment] = useMutation(UNLIKE_COMMENT);
	const [dislikeComment] = useMutation(DISLIKE_COMMENT);
	const [undislikeComment] = useMutation(UNDISLIKE_COMMENT);
	const [deleteComment] = useMutation(DELETE_COMMENT);
	const onLikeComment = async () => {
		if (!currentUser || disabled) return;
		setDisabled(true);
		if (commentLiked) {
			await unlikeComment({
				variables: {
					postId: post.id,
					userId: currentUser?.id,
					commentId: comment.id,
					commenterId: comment.commenter.id,
				},
			});
			setCommentLikes((likes) => likes - 1);
			setCommentLiked(false);
		} else if (commentDisliked) {
			await Promise.all([
				undislikeComment({
					variables: {
						postId: post.id,
						userId: currentUser?.id,
						commentId: comment.id,
						commenterId: comment.commenter.id,
					},
				}),
				likeComment({
					variables: {
						postId: post.id,
						userId: currentUser?.id,
						commentId: comment.id,
						commenterId: comment.commenter.id,
					},
				}),
			]);
			setCommentDislikes((dislikes) => dislikes - 1);
			setCommentDisliked(false);
			setCommentLikes((likes) => likes + 1);
			setCommentLiked(true);
		} else {
			await likeComment({
				variables: {
					postId: post.id,
					userId: currentUser?.id,
					commentId: comment.id,
					commenterId: comment.commenter.id,
				},
			});
			setCommentLikes((likes) => likes + 1);
			setCommentLiked(true);
		}
		await refreshUserData();
		setDisabled(false);
	};
	const onDislikeComment = async () => {
		if (!currentUser || disabled) return;
		setDisabled(true);
		if (commentDisliked) {
			await undislikeComment({
				variables: {
					postId: post.id,
					userId: currentUser?.id,
					commentId: comment.id,
					commenterId: comment.commenter.id,
				},
			});
			setCommentDislikes((dislikes) => dislikes - 1);
			setCommentDisliked(false);
		} else if (commentLiked) {
			await Promise.all([
				unlikeComment({
					variables: {
						postId: post.id,
						userId: currentUser?.id,
						commentId: comment.id,
						commenterId: comment.commenter.id,
					},
				}),
				dislikeComment({
					variables: {
						postId: post.id,
						userId: currentUser?.id,
						commentId: comment.id,
						commenterId: comment.commenter.id,
					},
				}),
			]);
			setCommentLikes((likes) => likes - 1);
			setCommentLiked(false);
			setCommentDislikes((dislikes) => dislikes + 1);
			setCommentDisliked(true);
		} else {
			await dislikeComment({
				variables: {
					postId: post.id,
					userId: currentUser?.id,
					commentId: comment.id,
					commenterId: comment.commenter.id,
				},
			});
			setCommentDislikes((dislikes) => dislikes + 1);
			setCommentDisliked(true);
		}
		await refreshUserData();
		setDisabled(false);
	};
	const onDeleteComment = async () => {
		if (!currentUser || disabled) return;
		setDisabled(true);
		await deleteComment({
			variables: {
				commentId: comment.id,
				postId: post.id,
				publisherId: post.publisher.id,
				commenter: comment.commenter.id,
			},
		});
		await refreshUserData();
		setDisabled(false);
	};

	return (
		<div className="group flex items-start gap-3 px-4 py-3 hover:bg-gray-800/20 transition-colors duration-150">
			{/* Avatar */}
			<Image
				height={32}
				width={32}
				className="w-8 h-8 rounded-full object-cover shrink-0 mt-0.5"
				src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${comment.commenter.avatarKey}`}
				alt="commenter photo"
			/>

			{/* Content */}
			<div className="flex-1 min-w-0">
				{/* Username + time */}
				<div className="flex items-center gap-2 mb-0.5">
					<span className="text-xs font-medium text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-200">
						{comment.commenter.username}
					</span>
					<span className="text-[10px] text-gray-600">
						{timeNumber && timeWord
							? `${timeNumber} ${timeWord} ago`
							: "Just now"}
					</span>
				</div>

				{/* Comment text */}
				<p className="text-sm text-gray-400 break-words leading-relaxed">
					{comment.comment}
				</p>

				{/* Actions */}
				<div className="flex items-center gap-3 mt-1.5">
					<button
						className={`flex items-center gap-1 text-xs transition-colors duration-200 ${
							commentLiked
								? "text-blue-400"
								: "text-gray-600 hover:text-gray-300"
						}`}
						onClick={onLikeComment}
					>
						<ThumbUpOffAltIcon sx={{ fontSize: 14 }} />
						{commentLikes > 0 && <span>{commentLikes}</span>}
					</button>

					<button
						className={`flex items-center gap-1 text-xs transition-colors duration-200 ${
							commentDisliked
								? "text-red-400"
								: "text-gray-600 hover:text-gray-300"
						}`}
						onClick={onDislikeComment}
					>
						<ThumbDownOffAltIcon sx={{ fontSize: 14 }} />
						{commentDislikes > 0 && <span>{commentDislikes}</span>}
					</button>

					{comment.commenter.id === currentUser?.id && (
						<button
							onClick={() => onDeleteComment()}
							className="flex items-center text-xs text-gray-600 hover:text-red-400 transition-colors duration-200 opacity-0 group-hover:opacity-100 ml-auto"
						>
							<DeleteIcon sx={{ fontSize: 14 }} />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Comment;
