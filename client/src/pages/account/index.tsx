import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/apiCalls";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "@/graphql/mutations/updateUser";
import { postImage } from "@/functions/s3_functions/postImage";
import AccountView from "@/components/Account/AccountView";
import { validatePassword } from "@/functions/validateForm";

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
			<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono overflow-y-scroll">
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
