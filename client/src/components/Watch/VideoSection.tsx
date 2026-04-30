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
import FollowButton from "./FollowButton";

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
        currentUser?.likedPostsIds.includes(post.id),
    );
    const [postDisliked, setPostDisliked] = useState<boolean>(
        currentUser?.dislikedPostsIds.includes(post.id),
    );
    const [postLikePercentage, setPostLikePercentage] = useState<number>(0);
    const [likePost] = useMutation(LIKE_POST);
    const [unlikePost] = useMutation(UNLIKE_POST);
    const [dislikePost] = useMutation(DISLIKE_POST);
    const [undislikePost] = useMutation(UNDISLIKE_POST);

    const [followerCount, setFollowerCount] = useState<number>(
        post?.publisher?.followers?.length,
    );
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
    useEffect(() => {
        setPostLikePercentage(
            postDislikes ? (postLikes / (postLikes + postDislikes)) * 100 : 100,
        );
    }, [postLikes, postDislikes]);

    return (
        <div className="w-full h-full flex flex-col">
            {/* Video player */}
            <div className="w-full bg-black">
                <video
                    src={`https://${process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN}${post.videoKey}`}
                    controls
                    className="w-full aspect-video object-contain"
                />
            </div>

            {/* Video info area */}
            <div className="flex flex-col gap-4 p-5 lg:p-6">
                {/* Title */}
                <h1 className="text-xl lg:text-2xl font-semibold text-white leading-tight line-clamp-2">
                    {post.title}
                </h1>

                {/* Description */}
                {post.description && (
                    <p className="text-sm text-gray-400 leading-relaxed">
                        {post.description}
                    </p>
                )}

                {/* Meta row: views + time + like/dislike */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{post.views} views</span>
                        <span className="text-gray-700">•</span>
                        <span>
                            {timeNumber} {timeWord} ago
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        {/* Like button */}
                        <button
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-l-full text-sm font-medium transition-all duration-200 ${
                                postLiked
                                    ? "bg-blue-500/15 text-blue-400"
                                    : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-white"
                            }`}
                            onClick={onLikePost}
                        >
                            <ThumbUpOffAltIcon sx={{ fontSize: 18 }} />
                            <span>{postLikes}</span>
                        </button>

                        {/* Divider */}
                        <div className="w-px h-7 bg-gray-700/50" />

                        {/* Dislike button */}
                        <button
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-r-full text-sm font-medium transition-all duration-200 ${
                                postDisliked
                                    ? "bg-red-500/15 text-red-400"
                                    : "bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-white"
                            }`}
                            onClick={onDislikePost}
                        >
                            <ThumbDownOffAltIcon sx={{ fontSize: 18 }} />
                            <span>{postDislikes}</span>
                        </button>
                    </div>
                </div>

                {/* Like/dislike bar */}
                <div className="w-full flex items-center h-1 rounded-full overflow-hidden bg-gray-800/50">
                    <div
                        className={`${
                            likeDislikeBar[Math.trunc(postLikePercentage)][0]
                        } h-full bg-blue-500 rounded-l-full transition-all duration-500`}
                    />
                    <div
                        className={`${
                            likeDislikeBar[Math.trunc(postLikePercentage)][1]
                        } h-full bg-red-500/60 rounded-r-full transition-all duration-500`}
                    />
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gray-800/60" />

                {/* Publisher info */}
                <div className="flex items-center gap-3">
                    <Link
                        href={{ pathname: `/user/${post.publisher.username}` }}
                        className="shrink-0"
                    >
                        <Image
                            height={40}
                            width={40}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-800 hover:ring-blue-500/50 transition-all duration-200"
                            src={
                                post.publisher.avatarKey.startsWith(
                                    "https://lh3.googleusercontent.com",
                                )
                                    ? post.publisher.avatarKey
                                    : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${post.publisher.avatarKey}`
                            }
                            alt="user photo"
                        />
                    </Link>
                    <div className="flex flex-col min-w-0">
                        <Link
                            href={{
                                pathname: `/user/${post.publisher.username}`,
                            }}
                            className="text-white text-sm font-medium hover:text-blue-400 transition-colors duration-200 truncate"
                        >
                            {post.publisher.username}
                        </Link>
                        <span className="text-xs text-gray-500">
                            {followerCount} followers
                        </span>
                    </div>
                    {currentUser?.id !== post.publisher.id && (
                        <div className="ml-auto">
                            <FollowButton
                                publisherId={post.publisher.id}
                                publisherName={post.publisher.username}
                                currentUser={currentUser}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoSection;
