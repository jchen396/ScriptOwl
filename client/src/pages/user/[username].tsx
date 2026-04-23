import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_USER_BY_USERNAME } from "@/graphql/queries/getUserbyUsername";
import client from "../../../apollo-client";
import { IPost, IUser } from "../../../../types/types";
import Image from "next/image";
import { USER_POSTS } from "@/graphql/queries/userPosts";
import VideoRow from "../../components/User/VideoRow";
import FollowButton from "@/components/Watch/FollowButton";
import { useSelector } from "react-redux";

type Props = {};

const Profile: FunctionComponent<Props> = () => {
    const router = useRouter();
    const { currentUser } = useSelector((state: any) => state.user);
    const username = router.query.username;
    const [targetUser, setTargetUser] = useState<IUser | null>(null);
    const [profileLoading, setProfileLoading] = useState<boolean>(true);
    const [videosLoading, setVideosLoading] = useState<boolean>(true);

    const [showUpload, setShowUpload] = useState<boolean>(false);

    const [videosData, setVideosData] = useState<IPost[]>([]);
    const fetchUserInfo = async () => {
        try {
            const { data } = await client.query({
                query: GET_USER_BY_USERNAME,
                variables: {
                    username,
                },
            });
            return await data.userByUsername;
        } catch (e) {}
    };
    const getLikedVideos = async () => {
        try {
            const { data } = await client.query({
                query: USER_POSTS,
                variables: {
                    postIds: targetUser?.likedPostsIds,
                },
            });
            return await data.userPosts;
        } catch (e) {}
    };
    const getUploads = async () => {
        try {
            const { data } = await client.query({
                query: USER_POSTS,
                variables: {
                    postIds: targetUser?.uploadedPostIds,
                },
            });
            return await data.userPosts;
        } catch (e) {}
    };
    //Load user data
    useEffect(() => {
        if (username) {
            fetchUserInfo().then((data) => {
                setTargetUser(data);
            });
            setProfileLoading(false);
        }
    }, [username]);
    useEffect(() => {
        if (targetUser) {
            if (showUpload) {
                getUploads().then((data) => {
                    setVideosData(data);
                });
            } else {
                getLikedVideos().then((data) => {
                    setVideosData(data);
                });
            }
            setVideosLoading(false);
        }
    }, [targetUser, showUpload]);
    return (
        <>
            <div className="flex flex-col items-center justify-center space-y-10 py-10 text-white font-sans w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
                {profileLoading ? (
                    <h1 className="text-white">Loading profile...</h1>
                ) : (
                    <>
                        {targetUser !== null ? (
                            <div className="p-10 w-full h-screen flex flex-col justify-start items-center md:flex-row space-y-10">
                                <div className="h-full flex flex-col justify-center items-center basis-1/2 space-y-10 md:py-20">
                                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mb-4">
                                        {targetUser?.username}
                                    </h1>
                                    <Image
                                        height={100}
                                        width={100}
                                        className="w-40 h-40 rounded-full border-4 border-gray-700/50 shadow-2xl"
                                        src={
                                            targetUser.avatarKey.startsWith(
                                                "https://lh3.googleusercontent.com",
                                            )
                                                ? targetUser.avatarKey
                                                : `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}images/${targetUser.avatarKey}`
                                        }
                                        alt="user photo"
                                    />
                                    {currentUser?.id !== targetUser.id ? (
                                        <FollowButton
                                            publisherId={targetUser.id}
                                            currentUser={currentUser}
                                            publisherName={targetUser.username}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    <h2 className="text-gray-400 text-xl font-medium mt-4">
                                        Points: {targetUser?.points}
                                    </h2>
                                </div>

                                <div className="h-full w-full flex flex-col justify-between items-center basis-1/2 space-y-10 md:py-20">
                                    <button
                                        onClick={() =>
                                            setShowUpload(!showUpload)
                                        }
                                        className="w-48 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold py-3 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                                    >
                                        Show{" "}
                                        {showUpload
                                            ? "Liked videos"
                                            : "Uploads"}
                                    </button>
                                    <h1 className="text-gray-400 text-3xl font-semibold mt-4">
                                        {showUpload
                                            ? "Uploads"
                                            : "Liked Videos"}
                                    </h1>
                                    <div className="h-full w-4/5 ">
                                        {videosLoading ? (
                                            <>
                                                <h2 className="flex justify-center items-center text-xl text-slate-500">
                                                    Loading videos...
                                                </h2>
                                            </>
                                        ) : (
                                            <>
                                                {targetUser?.uploadedPostIds
                                                    .length > 0 ? (
                                                    <div className="flex flex-col items-center justify-start w-full">
                                                        <VideoRow
                                                            posts={videosData}
                                                        />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h2 className="flex justify-center items-center text-xl text-gray-400 font-light bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl p-8">
                                                            This user has no
                                                            {showUpload
                                                                ? " uploads"
                                                                : " liked videos"}
                                                            .
                                                        </h2>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h1 className="text-white text-2xl">
                                Could not find user {username}.
                            </h1>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Profile;
