import { LOG_IN_USER } from "@/graphql/queries/login";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import client from "../../apollo-client";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";

export const login = async (
	dispatch: Dispatch<AnyAction>,
	{
		logInUsername,
		logInPassword,
	}: { logInUsername: string | undefined; logInPassword: string | undefined }
) => {
	try {
		dispatch(loginStart());
		const { data } = await client.query({
			query: LOG_IN_USER,
			variables: {
				username: logInUsername,
				password: logInPassword,
			},
		});
		dispatch(loginSuccess(data.logInUser));
	} catch (err) {
		dispatch(loginFailure());
	}
};
