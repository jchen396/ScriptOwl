import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
	onDeleteAccount: (e: any) => Promise<void>;
};

const DeleteAccButton: React.FunctionComponent<Props> = ({
	onDeleteAccount,
}) => {
	return (
		<button
			onClick={onDeleteAccount}
			className="flex justify-center items-center p-2 rounded-lg bg-red-600 hover:bg-red-400"
		>
			<DeleteIcon />
			Delete Account
		</button>
	);
};

export default DeleteAccButton;
