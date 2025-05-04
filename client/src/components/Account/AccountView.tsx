import { IUser } from "./../../../../types/types";
import React, { useEffect, useState } from "react";
import AccountForm from "./AccountForm";
import Avatar from "./Avatar";
import Points from "./Points";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteAccButton from "./DeleteAccButton";
import Following from "./Following";
import client from "../../../apollo-client";
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
            <h1 className="text-4xl font-medium text-slate-100">Account</h1>
            <div className="flex flex-col space-y-4 border-2 border-slate-100 bg-transparent text-slate-100 w-2/3 h-2/3 md:px-0">
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
                        <Following currentUser={currentUser} />
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
                        className={`text-2xl text-black p-2 px-4 rounded-lg text-bold items-center justify-center
						 ${
                             currentUser.isVerified
                                 ? `
							${
                                loading
                                    ? "hover:cursor-not-allowed bg-gray-300"
                                    : "bg-white hover:bg-gray-300 hover:cursor-pointer"
                            }
						`
                                 : "border-gray-600 bg-gray-600 text-white hover:cursor-not-allowed"
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
