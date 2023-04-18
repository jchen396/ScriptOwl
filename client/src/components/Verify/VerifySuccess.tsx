import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
	redirectCounter: number;
}

const VerifySuccess: React.FC<Props> = ({ redirectCounter }) => {
	return (
		<div className="h-screen w-screen flex flex-col items-center justify-center space-y-10 font-mono overflow-y-scroll">
			<div className="relative bg-gray-900 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl flex flex-col justify-center items-center text-white">
				<div className="flex flex-row justify-center items-center text-xl">
					<p>Successfully verified account!</p>
					<CheckCircleIcon
						className="text-green-500"
						sx={{ fontSize: 40 }}
					/>
				</div>
				<div>
					<p className="text-gray-400 text-sm">
						Redirecting in {redirectCounter}...
					</p>
				</div>
			</div>
		</div>
	);
};

export default VerifySuccess;
