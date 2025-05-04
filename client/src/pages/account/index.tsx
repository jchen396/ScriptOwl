import { FunctionComponent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/apiCalls";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/updateUser";
import { postImage } from "@/functions/s3_functions/postImage";
import AccountView from "@/components/Account/AccountView";
import { validatePassword } from "@/functions/validateForm";
import Head from "next/head";
import { GET_AVATAR_KEYS_BY_ID } from "@/graphql/queries/getAvatarKeysById";
import client from "../../../apollo-client";
import { current } from "@reduxjs/toolkit";

interface Props {}

const Account: FunctionComponent<Props> = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [changePassword, setChangePassword] = useState<boolean>(false);
    const [changeUsername, setChangeUsername] = useState<boolean>(false);
    const [newUsername, setNewUsername] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
    const [imageKey, setImageKey] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [editToggle, setEditToggle] = useState<boolean>(false);
    const [deleteMsg, setDeleteMsg] = useState<string>("");
    const [showDeleteMsg, setShowDeleteMsg] = useState<boolean>(false);
    const [deleteConfirmInput, setDeleteConfirmInput] = useState<string>("");
    const [followingAvatarKeys, setFollowingAvatarKeys] = useState<string[]>(
        []
    );
    const [followerAvatarKeys, setFollowerAvatarKeys] = useState<string[]>([]);
    const { currentUser } = useSelector((state: any) => state.user);
    const [userUpdateMutate, { loading }] = useMutation(UPDATE_USER);
    if (!currentUser) {
        try {
            router.replace("/");
        } catch (err) {
            console.log(err);
        }
    }
    const onEditToggle = () => {
        setEditToggle(!editToggle);
    };
    const onResetPhoto = () => {
        setImageKey("");
    };
    const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const targetFile = e.target.files[0];
            const result = await postImage({ image: targetFile });
            setImageKey(result.key);
        } else {
            return;
        }
    };
    const onSaveChanges = async () => {
        try {
            if (newPassword && !validatePassword(newPassword)) {
                setErrorMessage(
                    "Password must be eight or more characters, including upper and lowercase letters, and at least one number. "
                );
            }
            if (newPassword !== confirmNewPassword) {
                setErrorMessage("Passwords do not match.");
            }
            const id = currentUser.id;
            const { data } = await userUpdateMutate({
                variables: {
                    id: id,
                    avatarKey: imageKey ? imageKey : currentUser.avatarKey,
                    password: newPassword,
                    username: newUsername ? newUsername : currentUser.username,
                },
            });
            updateUser(dispatch, data.updateUser);
            setNewPassword("");
            setNewUsername("");
            setImageKey("");
        } catch (err) {
            setErrorMessage(err);
        }
    };
    const onDeleteAccount = async () => {
        try {
            setShowDeleteMsg(true);
            setDeleteMsg(`Type \'${currentUser?.username}\' to confirm:`);
        } catch (err) {
            setErrorMessage(err);
        }
    };
    return (
        <>
            <Head>
                <title>ScriptOwl | Account</title>
                <meta
                    name="description"
                    content="ScriptOwl is a video streaming site is dedicated to revolutionizing the way people learn and consume media content. By harnessing the power of GPT 3.5, we provide users with real-time translation of video transcripts, as well as a summarization feature that saves time and makes information more digestible. In addition, our quiz creation feature allows users to test their knowledge and reinforce what they've learned. Our goal is to break down language barriers and make learning more accessible to everyone, and we're constantly striving to innovate and improve the user experience. Join us on our mission to bring the world closer together through the power of video."
                />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta
                    property="og:title"
                    content="
					ScriptOwl | Account 
				"
                    key="title"
                />
                <link rel="icon" href="/img/ScriptOwl_logo_transparent.png" />
            </Head>
            <div className="h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-10">
                {showDeleteMsg && (
                    <div className="absolute rounded-lg flex flex-col justify-center items-center p-4 border-2 bg-black text-white">
                        <p>Are you sure you want to delete this account? </p>
                        <br />
                        <p>{deleteMsg}</p>
                        <input
                            className="text-black"
                            onChange={(e) =>
                                setDeleteConfirmInput(e.currentTarget.value)
                            }
                            type="text"
                        />
                        <div className="flex flex-row justify-center items-center space-x-2">
                            <button
                                className="p-2 flex justify-center items-center"
                                onClick={() =>
                                    deleteConfirmInput === currentUser.username
                                        ? console.log("deleting")
                                        : console.log("wrong input")
                                }
                            >
                                Confirm
                            </button>
                            <button
                                className="p-2 flex justify-center items-center"
                                onClick={() => setShowDeleteMsg(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
                {currentUser && (
                    <AccountView
                        imageKey={imageKey}
                        currentUser={currentUser}
                        onResetPhoto={onResetPhoto}
                        onFileSelect={onFileSelect}
                        onSaveChanges={onSaveChanges}
                        onDeleteAccount={onDeleteAccount}
                        editToggle={editToggle}
                        onEditToggle={onEditToggle}
                        changePassword={changePassword}
                        setChangePassword={setChangePassword}
                        changeUsername={changeUsername}
                        setChangeUsername={setChangeUsername}
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        newUsername={newUsername}
                        setNewUsername={setNewUsername}
                        confirmNewPassword={confirmNewPassword}
                        setConfirmNewPassword={setConfirmNewPassword}
                        followingAvatarKeys={followingAvatarKeys}
                        setFollowingAvatarKeys={setFollowingAvatarKeys}
                        followerAvatarKeys={followerAvatarKeys}
                        setFollowerAvatarKeys={setFollowerAvatarKeys}
                        loading={loading}
                        errorMessage={errorMessage}
                    />
                )}
            </div>
        </>
    );
};

export default Account;
