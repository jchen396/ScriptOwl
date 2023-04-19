import { IUser } from "./../../../../types/types";
import React from "react";
import { ParsedUrlQuery } from "querystring";
import AccountForm from "./AccountForm";
import Avatar from "./Avatar";
import Points from "./Points";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";

interface Props {
	imageKey: string;
	currentUser: IUser;
	userData: IUser | ParsedUrlQuery;
	onEditToggle: () => void;
	onResetPhoto: () => void;
	onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSaveChanges: (e: any) => Promise<void>;
	editToggle: boolean;
	changePassword?: boolean;
	setChangePassword: React.Dispatch<
		React.SetStateAction<boolean | undefined>
	>;
	newPassword: string;
	setNewPassword: React.Dispatch<React.SetStateAction<string>>;
	confirmNewPassword: string;
	setConfirmNewPassword: React.Dispatch<React.SetStateAction<string>>;
	loading: boolean;
	errorMessage: string;
}
const AccountView: React.FunctionComponent<Props> = ({
	imageKey,
	currentUser,
	userData,
	onEditToggle,
	onResetPhoto,
	onFileSelect,
	onSaveChanges,
	editToggle,
	changePassword,
	setChangePassword,
	newPassword,
	setNewPassword,
	confirmNewPassword,
	setConfirmNewPassword,
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
					</div>
					<AccountForm
						userData={userData}
						changePassword={changePassword}
						setChangePassword={setChangePassword}
						setNewPassword={setNewPassword}
						confirmNewPassword={confirmNewPassword}
						setConfirmNewPassword={setConfirmNewPassword}
					/>
				</div>
			</div>
			{(newPassword || imageKey) && (
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
