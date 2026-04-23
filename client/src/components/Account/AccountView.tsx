import { IUser } from "./../../../../types/types";
import React, { useEffect, useState } from "react";
import AccountForm from "./AccountForm";
import Avatar from "./Avatar";
import Points from "./Points";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteAccButton from "./DeleteAccButton";
import FollowData from "./FollowData";
import { GET_AVATAR_KEYS_BY_ID } from "@/graphql/queries/getAvatarKeysById";

interface Props {
    imageKey: string;
    currentUser: IUser;
    onEditToggle: () => void;
    onResetPhoto: () => void;
    onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSaveChanges: (e: any) => Promise<void>;
    onDeleteAccount: (e: any) => Promise<void>;
    editToggle: boolean;
    changePassword?: boolean;
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
    changeUsername?: boolean;
    setChangeUsername: React.Dispatch<React.SetStateAction<boolean>>;
    newPassword: string;
    setNewPassword: React.Dispatch<React.SetStateAction<string>>;
    newUsername: string;
    setNewUsername: React.Dispatch<React.SetStateAction<string>>;
    confirmNewPassword: string;
    setConfirmNewPassword: React.Dispatch<React.SetStateAction<string>>;
    followingAvatarKeys: string[];
    setFollowingAvatarKeys: React.Dispatch<React.SetStateAction<string[]>>;
    followerAvatarKeys: string[];
    setFollowerAvatarKeys: React.Dispatch<React.SetStateAction<string[]>>;
    loading: boolean;
    errorMessage: string;
}
const AccountView: React.FunctionComponent<Props> = ({
    imageKey,
    currentUser,
    onEditToggle,
    onResetPhoto,
    onFileSelect,
    onSaveChanges,
    onDeleteAccount,
    editToggle,
    changePassword,
    setChangePassword,
    changeUsername,
    setChangeUsername,
    newPassword,
    setNewPassword,
    newUsername,
    setNewUsername,
    confirmNewPassword,
    setConfirmNewPassword,
    followingAvatarKeys,
    setFollowingAvatarKeys,
    followerAvatarKeys,
    setFollowerAvatarKeys,
    loading,
    errorMessage,
}) => {
    return (
        <>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mb-6">Account</h1>
            <div className="flex flex-col space-y-6 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl text-slate-100 w-11/12 lg:w-2/3 p-8">
                {errorMessage && (
                    <div className="m-2 flex flex-row items-center justify-between text-sm text-red-700 bg-red-300 rounded-md p-4">
                        <ErrorIcon />
                        <p>{errorMessage}</p>
                        <CloseIcon
                            className="hover:cursor-pointer"
                            onClick={() => errorMessage}
                        />
                    </div>
                )}
                <div className="w-full h-full flex flex-col justify-between items-center md:flex-row space-y-10">
                    <div className="h-full flex flex-col justify-between items-center basis-1/2 space-y-10 md:py-20  ">
                        <Avatar
                            imageKey={imageKey}
                            currentUser={currentUser}
                            onEditToggle={onEditToggle}
                            onResetPhoto={onResetPhoto}
                            onFileSelect={onFileSelect}
                            editToggle={editToggle}
                        />
                        <Points currentUser={currentUser} />
                        <FollowData currentUser={currentUser} />
                        <DeleteAccButton onDeleteAccount={onDeleteAccount} />
                    </div>
                    <AccountForm
                        currentUser={currentUser}
                        changePassword={changePassword}
                        setChangePassword={setChangePassword}
                        changeUsername={changeUsername}
                        setChangeUsername={setChangeUsername}
                        setNewPassword={setNewPassword}
                        setNewUsername={setNewUsername}
                        confirmNewPassword={confirmNewPassword}
                        setConfirmNewPassword={setConfirmNewPassword}
                    />
                </div>
            </div>
            {(newPassword || imageKey || newUsername) && (
                <div>
                    <button
                        className={`text-xl font-semibold py-3 px-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg ${
                             currentUser.isVerified
                                 ? loading
                                    ? "opacity-70 cursor-not-allowed bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 cursor-pointer"
                                 : "bg-gray-600 text-gray-300 cursor-not-allowed"
                         }`}
                        onClick={onSaveChanges}
                        disabled={!currentUser.isVerified}
                    >
                        {loading ? (
                            <div className="w-full flex flex-row justify-center items-center space-x-4">
                                <div role="status">
                                    <div
                                        className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-black motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                        role="status"
                                    >
                                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                            Loading...
                                        </span>
                                    </div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <span>Saving changes...</span>
                            </div>
                        ) : (
                            <span>Save changes</span>
                        )}
                    </button>
                </div>
            )}
        </>
    );
};

export default AccountView;
