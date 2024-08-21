import React, { useEffect, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "@/graphql/mutations/addUser";
import { useDispatch, useSelector } from "react-redux";
import client from "../../../apollo-client";
import { GET_USER_BY_EMAIL } from "@/graphql/queries/getUserByEmail";

interface Props {}

const OAuthOptions: React.FunctionComponent<Props> = ({}) => {
	const [emailExists, setEmailExists] = useState<boolean>(false);
	const [OAuthAttempt, setOAuthAttempt] = useState<boolean>(false);
	const [addUser, { loading }] = useMutation(ADD_USER);
	const { currentUser, error, isFetching } = useSelector(
		(state: any) => state.user
	);
	const dispatch = useDispatch();
	const searchParams = useSearchParams();
	const navigate = (url: string) => {
		window.location.href = url;
	};
	const auth = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}request`,
			{ method: "post" }
		);
		const data = await res.json();
		navigate(data.url);
	};
	useEffect(() => {
		if (searchParams.size) {
			const search = location.search.substring(1);
			const params = JSON.parse(
				'{"' +
					decodeURI(search)
						.replace(/"/g, '\\"')
						.replace(/&/g, '","')
						.replace(/=/g, '":"') +
					'"}'
			);
			const paramsString =
				Object.keys(params)[0] +
				"=" +
				params[`${Object.keys(params)[0]}`];
			const paramsObj = JSON.parse(paramsString);
			(async (email: string) => {
				const { data } = await client.query({
					query: GET_USER_BY_EMAIL,
					variables: {
						email,
					},
				});
				console.log("changing");
				if (await data.userByEmail) {
					setEmailExists(true);
				} else {
					setEmailExists(false);
				}
				setOAuthAttempt(true);
			})(paramsObj["email"]);
		}
	}, [searchParams.size]);
	useEffect(() => {
		console.log({ emailExists, OAuthAttempt });
		if (OAuthAttempt) {
			console.log("Attempted.");
			if (emailExists) {
				console.log("signing in...");
			} else {
				console.log("creating account...");
			}
		}
		setOAuthAttempt(false);
	}, [OAuthAttempt]);

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
