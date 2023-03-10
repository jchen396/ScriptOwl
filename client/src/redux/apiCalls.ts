import { SIGN_OUT } from "@/graphql/mutations/signOut";
import { CHECK_TOKENS } from "@/graphql/queries/checkTokens";
import { LOG_IN_USER } from "@/graphql/queries/login";
import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import client from "../../apollo-client";
import {
	loginFailure,
	loginStart,
	loginSuccess,
	logoutStart,
} from "./userRedux";

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
export const authenticate = async (dispatch: Dispatch<AnyAction>) => {
	try {
		dispatch(loginStart());
		const { data } = await client.query({
			query: CHECK_TOKENS,
		});
		dispatch(loginSuccess(data.checkTokens));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const signOut = async (dispatch: Dispatch<AnyAction>) => {
	dispatch(logoutStart());
	await client.query({
		query: SIGN_OUT,
	});
};
