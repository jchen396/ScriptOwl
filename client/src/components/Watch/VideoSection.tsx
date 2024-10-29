import { IPost, IUser } from "./../../../../types/types";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useMutation } from "@apollo/client";
import { LIKE_POST } from "@/graphql/mutations/likePost";
import { UNLIKE_POST } from "@/graphql/mutations/unlikePost";
import { DISLIKE_POST } from "@/graphql/mutations/dislikePost";
import { UNDISLIKE_POST } from "@/graphql/mutations/undislikePost";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { likeDislikeBar } from "@/functions/likeDislikeBar";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { FOLLOW_USER } from "@/graphql/mutations/followUser";
import { UNFOLLOW_USER } from "@/graphql/mutations/unfollowUser";

type Props = {
	currentUser: IUser;
	post: IPost;
	timeNumber?: string;
	timeWord?: string;
	refreshUserData: () => Promise<void>;
};

const VideoSection: React.FunctionComponent<Props> = ({
	currentUser,
	post,
	timeNumber,
	timeWord,
	refreshUserData,
}) => {
	const router = useRouter();
	const [disabled, setDisabled] = useState<boolean>(false);
	const [postLikes, setPostLikes] = useState<number>(post.likes);
	const [postDislikes, setPostDislikes] = useState<number>(post.dislikes);
	const [postLiked, setPostLiked] = useState<boolean>(
		currentUser?.likedPostsIds.includes(post.id)
	);
	const [postDisliked, setPostDisliked] = useState<boolean>(
		currentUser?.dislikedPostsIds.includes(post.id)
	);
	const [postLikePercentage, setPostLikePercentage] = useState<number>(0);
	const [likePost] = useMutation(LIKE_POST);
	const [unlikePost] = useMutation(UNLIKE_POST);
	const [dislikePost] = useMutation(DISLIKE_POST);
	const [undislikePost] = useMutation(UNDISLIKE_POST);

	const [followerCount, setFollowerCount] = useState<number>(
		post?.publisher?.followers?.length
	);
	const [isFollowing, setIsFollowing] = useState<boolean>(
		currentUser?.following?.includes(post.publisher.id)
	);
	const [followStatus, setFollowStatus] = useState<string>(
		currentUser?.following?.includes(post.publisher.id)
			? "✔ Following"
			: "Follow"
	);
	const [followUser] = useMutation(FOLLOW_USER);
	const [unfollowUser] = useMutation(UNFOLLOW_USER);
	const onLikePost = async () => {
		if (!currentUser) {
			router.push("/login");
		} else {
			if (disabled) return;
			setDisabled(true);
			if (postLiked) {
				await unlikePost({
					variables: {
						postId: post.id,
						userId: currentUser?.id,
						publisherId: post.publisher.id,
					},
				});
				setPostLikes((likes) => likes - 1);
				setPostLiked(false);
			} else if (postDisliked) {
				await Promise.all([
					undislikePost({
						variables: {
							postId: post.id,
							userId: currentUser?.id,
							publisherId: post.publisher.id,
						},
					}),
					likePost({
						variables: {
							postId: post.id,
							userId: currentUser?.id,
							publisherId: post.publisher.id,
						},
					}),
				]);
				setPostDislikes((dislikes) => dislikes - 1);
				setPostDisliked(false);
				setPostLikes((likes) => likes + 1);
				setPostLiked(true);
			} else {
				await likePost({
					variables: {
						postId: post.id,
						userId: currentUser?.id,
						publisherId: post.publisher.id,
					},
				});
				setPostLikes((likes) => likes + 1);
				setPostLiked(true);
			}
			await refreshUserData();
		}
		setDisabled(false);
	};
	const onDislikePost = async () => {
		if (!currentUser) {
			router.push("/login");
		} else {
			if (disabled) return;
			setDisabled(true);
			if (postDisliked) {
				await undislikePost({
					variables: {
						postId: post.id,
						userId: currentUser?.id,
						publisherId: post.publisher.id,
					},
				});
				setPostDislikes((dislikes) => dislikes - 1);
				setPostDisliked(false);
			} else if (postLiked) {
				await Promise.all([
					unlikePost({
						variables: {
							postId: post.id,
							userId: currentUser?.id,
							publisherId: post.publisher.id,
						},
					}),
					dislikePost({
						variables: {
							postId: post.id,
							userId: currentUser?.id,
							publisherId: post.publisher.id,
						},
					}),
				]);
				setPostLikes((likes) => likes - 1);
				setPostLiked(false);
				setPostDislikes((dislikes) => dislikes + 1);
				setPostDisliked(true);
			} else {
				await dislikePost({
					variables: {
						postId: post.id,
						userId: currentUser?.id,
						publisherId: post.publisher.id,
					},
				});
				setPostDislikes((dislikes) => dislikes + 1);
				setPostDisliked(true);
			}
			await refreshUserData();
		}
		setDisabled(false);
	};
	const onFollow = async () => {
		if (!currentUser) {
			router.push("/login");
		} else {
			if (disabled) return;
			setDisabled(true);
			const { data } = await followUser({
				variables: {
					userId: currentUser?.id,
					publisherId: post.publisher.id,
				},
			});
			setIsFollowing(true);
			setFollowerCount(followerCount + 1);
			setFollowStatus("✔ Following");
		}
		setDisabled(false);
	};
	const onUnfollow = async () => {
		if (!currentUser) {
			router.push("/login");
		} else {
			if (disabled) return;
			setDisabled(true);
			const { data } = await unfollowUser({
				variables: {
					userId: currentUser?.id,
					publisherId: post.publisher.id,
				},
			});
			setIsFollowing(false);
			setFollowerCount(followerCount - 1);
			setFollowStatus("Follow");
		}
		setDisabled(false);
	};
	useEffect(() => {
		setPostLikePercentage(
			postDislikes ? (postLikes / (postLikes + postDislikes)) * 100 : 100
		);
	}, [postLikes, postDislikes]);
	console.log(post.publisher.followers.length);

	return (
		<div className="basis-2/3 w-full h-full flex justify-center items-center">
			<div className="flex flex-col justify-center items-center space-y-2">
				<ReactPlayer
					url={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
					width="90%"
					height="auto"
					controls={true}
				/>

				<div className="w-[90%] flex flex-row justify-between items-center text-white text-2xl">
					<div className="flex flex-col items-start">
						<div className="flex flex-row space-x-4">
							<p>{post.views} views</p>
							<span>&middot;</span>
							<p>
								{timeNumber} {timeWord} ago
							</p>
						</div>
					</div>

					<div className="flex flex-col space-y-2">
						<div className="flex flex-row space-x-4 text-4xl">
							<div
								className={`hover:cursor-pointer ${
									postLiked
										? "hover:text-blue-400 text-blue-600 "
										: "hover:text-white text-gray-400"
								}`}
								onClick={onLikePost}
							>
								<ThumbUpOffAltIcon sx={{ fontSize: 40 }} />
							</div>

							<p>{postLikes}</p>
							<div
								className={`hover:cursor-pointer ${
									postDisliked
										? "hover:text-red-400 text-red-600 "
										: "hover:text-white text-gray-400"
								}`}
								onClick={onDislikePost}
							>
								<ThumbDownOffAltIcon sx={{ fontSize: 40 }} />
							</div>

							<p>{postDislikes}</p>
						</div>
						<div className="w-full flex flex-row justify-center items-center">
							<div
								className={`
									 ${
											likeDislikeBar[
												Math.trunc(postLikePercentage)
											][0]
										} py-1 bg-blue-600 rounded-l-full`}
							></div>
							<div
								className={`
									 ${
											likeDislikeBar[
												Math.trunc(postLikePercentage)
											][1]
										} py-1 bg-red-600 rounded-r-full`}
							></div>
						</div>
					</div>
				</div>
				<div className="w-[90%] flex flex-row items-center text-white text-2xl space-x-2">
					<Image
						height={50}
						width={50}
						className="w-10 h-10 rounded-full"
						src={
							post.publisher.avatarKey.startsWith(
								"https://lh3.googleusercontent.com"
							)
								? post.publisher.avatarKey
								: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${post.publisher.avatarKey}`
						}
						alt="user photo"
					/>
					<div className="flex flex-col justify-center items-start">
						<Link
							href={{
								pathname: `/user/${post.publisher.username}`,
							}}
						>
							<span>{post.publisher.username}</span>
						</Link>
						<span className="text-sm text-slate-400">
							{followerCount} followers
						</span>
					</div>
					{currentUser?.id !== post.publisher.id ? (
						<button
							onClick={() =>
								isFollowing ? onUnfollow() : onFollow()
							}
							className="p-2 px-4 bold text-white text-xl rounded-lg bg-blue-500 hover:opacity-80"
						>
							{followStatus}
						</button>
					) : (
						<></>
					)}
				</div>
			</div>
		</div>
	);
};

export default VideoSection;
