import React from "react";
import GoogleIcon from "@mui/icons-material/Google";

interface Props {}

const OAuthOptions: React.FunctionComponent<Props> = ({}) => {
	const navigate = (url: any) => {
		window.location.href = url;
	};
	const auth = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}request`,
			{ method: "post" }
		);
		console.log("data pulled");
		const data = await res.json();
		navigate(data.url);
	};
	return (
		<div className="w-3/4 flex flex-col justify-center items-center space-y-2">
			<button
				className="w-80 h-8 flex flex-row justify-center items-center border border-slate-100 flex-1 rounded space-x-2 p-4 w-100 w-3/4 lg:w-1/3"
				onClick={() => auth()}
			>
				<GoogleIcon className="text-slate-100" />
				<span className="text-slate-100 text-md text-bold">
					Sign In with Google
				</span>
			</button>
			<button className="w-80 h-8 flex flex-row justify-center items-center border border-slate-100 flex-1 rounded space-x-2 p-4 w-100 w-3/4 lg:w-1/3">
				<GoogleIcon className="text-slate-100" />
				<span className="text-slate-100 text-md text-bold">
					Sign In with Google
				</span>
			</button>
		</div>
	);
};

export default OAuthOptions;
