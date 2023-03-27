import { ApolloError } from "@apollo/client";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {
	error?: ApolloError;
	errorMessage: string;
	successMessage: string;
	signUpForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const RegisterForm: React.FunctionComponent<Props> = ({
	error,
	errorMessage,
	successMessage,
	signUpForm,
}) => {
	return (
		<>
			<h1 className="text-4xl text-slate-100">Sign Up</h1>
			<form
				onSubmit={(e) => signUpForm(e)}
				className="flex flex-col space-y-4 border-2 rounded border-slate-100 bg-transparent text-slate-100 w-100 p-10 w-3/4 lg:w-1/3 md:p-16"
			>
				{error?.message && (
					<div className="flex flex-row items-center justify-between text-sm text-red-700 bg-red-300 rounded-md p-4">
						<p>{error.message}</p>
						<CloseIcon />
					</div>
				)}
				{errorMessage && (
					<div className="flex flex-row items-center justify-between text-sm text-red-700 bg-red-300 rounded-md p-4">
						<p>{errorMessage}</p>
						<CloseIcon />
					</div>
				)}
				{successMessage && (
					<div className="bg-green-500 p-4 rounded flex flex-row justify-start items-center space-x-2">
						<CheckCircleIcon className="text-green-900" />
						<span className="text-black ">{successMessage}</span>
					</div>
				)}
				<div className="grid gap-6 mb-6 md:grid-cols-2 ">
					<div>
						<label
							htmlFor="username"
							className="block mb-2 text-sm text-gray-900 dark:text-white"
						>
							Username
						</label>
						<input
							type="text"
							id="username"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block mb-2 text-sm text-gray-900 dark:text-white"
						>
							Email
						</label>
						<input
							type="text"
							id="email"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							required
						/>
					</div>
				</div>
				<div className="mb-6">
					<label
						htmlFor="password"
						className="block mb-2 text-sm text-gray-900 dark:text-white"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="confirmPassword"
						className="block mb-2 text-sm text-gray-900 dark:text-white"
					>
						Confirm password
					</label>
					<input
						type="password"
						id="confirmPassword"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						required
					/>
				</div>
				<div className="flex items-start mb-6">
					<div className="flex items-center h-5">
						<input
							id="remember"
							type="checkbox"
							value=""
							className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
							required
						/>
					</div>
					<label
						htmlFor="remember"
						className="ml-2 text-sm text-gray-900 dark:text-gray-300"
					>
						I agree with the{" "}
						<a
							href="#"
							className="text-blue-600 hover:underline dark:text-blue-500"
						>
							terms and conditions
						</a>
						.
					</label>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Submit
				</button>
			</form>
		</>
	);
};

export default RegisterForm;