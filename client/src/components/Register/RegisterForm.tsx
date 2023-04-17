import { ApolloError } from "@apollo/client";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

type Props = {
	loading: boolean;
	errorMessage: string;
	successMessage: string;
	signUpForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
	setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
};

const RegisterForm: React.FunctionComponent<Props> = ({
	loading,
	errorMessage,
	successMessage,
	signUpForm,
	setErrorMessage,
	setSuccessMessage,
}) => {
	return (
		<>
			<h1 className="text-4xl text-slate-100">Sign Up</h1>
			<form
				onSubmit={(e) => signUpForm(e)}
				className="flex flex-col space-y-4 border-2 rounded border-slate-100 bg-transparent text-slate-100 w-100 p-10 w-3/4 lg:w-1/3 md:p-16"
			>
				{errorMessage && (
					<div className="flex flex-row items-center justify-between text-sm text-red-700 bg-red-300 rounded-md p-4 space-x-2">
						<ErrorIcon />
						<p>{errorMessage}</p>
						<CloseIcon
							className="hover:cursor-pointer"
							onClick={() => setErrorMessage("")}
						/>
					</div>
				)}
				{successMessage && (
					<div className="bg-green-500 p-4 rounded flex flex-row justify-between items-center space-x-2">
						<CheckCircleIcon className="text-green-900" />
						<p className="text-black ">{successMessage}</p>
						<CloseIcon
							className="hover:cursor-pointer text-green-900"
							onClick={() => setSuccessMessage("")}
						/>
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
					className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-blue-700 ${
						loading
							? "hover:cursor-not-allowed bg-blue-700"
							: "hover:cursor-pointer"
					} `}
				>
					{loading ? (
						<div className="w-full flex flex-row justify-center items-center space-x-4">
							<div role="status">
								<div
									className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-neutral-100 motion-reduce:animate-[spin_1.5s_linear_infinite]"
									role="status"
								>
									<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
										Loading...
									</span>
								</div>
								<span className="sr-only">Loading...</span>
							</div>
							<span>Creating Account...</span>
						</div>
					) : (
						<p>Sign Up</p>
					)}
				</button>
			</form>
		</>
	);
};

export default RegisterForm;
