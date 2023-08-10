import React from "react";
import CheckIcon from "@mui/icons-material/Check";

type Props = {};

const Pricing = (props: Props) => {
	return (
		<div className="h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-10">
			<h1 className="text-4xl font-medium text-slate-100">Pricing</h1>
			<div className="w-80 h-160 flex flex-col border-2 border-white rounded text-white p-4 space-x-6">
				<h2 className="self-center text-2xl py-4">Free Tier</h2>
				<hr className="border-gray-500 border-1 opacity-50" />
				<div className="flex justify-between py-4">
					<p>Video Upload</p>
					<CheckIcon className="text-blue-500" />
				</div>
				<hr className="border-gray-500 border-1 opacity-50" />
				<div className="flex justify-between py-4">
					<p>Commenting</p>
					<CheckIcon className="text-blue-500" />
				</div>
				<hr className="border-gray-500 border-1 opacity-50" />
				<div className="flex justify-between py-4">
					<p>Video Transcript</p>
					<CheckIcon className="text-blue-500" />
				</div>
				<hr className="border-gray-500 border-1 opacity-50" />
				<div className="flex justify-between py-4">
					<p>AI tools permission</p>
					<CheckIcon className="text-blue-500" />
				</div>
			</div>
		</div>
	);
};

export default Pricing;
