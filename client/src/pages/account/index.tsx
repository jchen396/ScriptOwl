import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/apiCalls";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/updateUser";
import { postImage } from "@/functions/s3_functions/postImage";
import AccountView from "@/components/Account/AccountView";
import { validatePassword } from "@/functions/validateForm";
import Head from "next/head";

interface Props {}

const Account: FunctionComponent<Props> = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [changePassword, setChangePassword] = useState<boolean>();
	const [newPassword, setNewPassword] = useState<string>("");
	const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
	const [imageKey, setImageKey] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [editToggle, setEditToggle] = useState<boolean>(false);
	const { currentUser } = useSelector((state: any) => state.user);
	const userData = router.query;
	const [userUpdateMutate, { loading }] = useMutation(UPDATE_USER);
	if (!currentUser || userData.username !== currentUser.username) {
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
					avatarKey: imageKey,
					password: newPassword,
				},
			});
			updateUser(dispatch, data.updateUser);
			setNewPassword("");
			setImageKey("");
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
				{currentUser && (
					<AccountView
						imageKey={imageKey}
						currentUser={currentUser}
						userData={userData}
						onResetPhoto={onResetPhoto}
						onFileSelect={onFileSelect}
						onSaveChanges={onSaveChanges}
						editToggle={editToggle}
						onEditToggle={onEditToggle}
						changePassword={changePassword}
						setChangePassword={setChangePassword}
						newPassword={newPassword}
						setNewPassword={setNewPassword}
						confirmNewPassword={confirmNewPassword}
						setConfirmNewPassword={setConfirmNewPassword}
						loading={loading}
						errorMessage={errorMessage}
					/>
				)}
			</div>
		</>
	);
};

export default Account;
