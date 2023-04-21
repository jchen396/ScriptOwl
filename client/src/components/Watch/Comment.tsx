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
	const onLikeComment = async () => {
		if (disabled) return;
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
		if (disabled) return;
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

	return (
		<>
			<div className="flex flex-row justify-start items-center p-2 space-x-4">
				<Image
					height={32}
					width={32}
					className="w-10 h-10 rounded-full"
					src={`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${comment.commenter.avatarKey}`}
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

					<p className="break-all">{comment.comment}</p>
					<div className="text-sm flex flex-row items-center space-x-2">
						<div
							className={`hover:cursor-pointer ${
								commentLiked
									? "hover:text-blue-400 text-blue-600 "
									: "hover:text-white text-gray-400"
							}`}
							onClick={onLikeComment}
						>
							<ThumbUpOffAltIcon />
						</div>

						<p>{commentLikes}</p>
						<div
							className={`hover:cursor-pointer ${
								commentDisliked
									? "hover:text-red-400 text-red-600 "
									: "hover:text-white text-gray-400"
							}`}
							onClick={onDislikeComment}
						>
							<ThumbDownOffAltIcon />
						</div>

						<p>{commentDislikes}</p>
					</div>
				</div>
			</div>
			<hr className="border-gray-800 opacity-75" />
		</>
	);
};

export default Comment;
