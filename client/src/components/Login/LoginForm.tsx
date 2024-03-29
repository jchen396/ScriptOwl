import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { ApolloError } from "@apollo/client";
import ErrorIcon from "@mui/icons-material/Error";

interface Props {
	validateForm: (e: React.FormEvent<HTMLFormElement>) => void;
	isFetching: boolean;
	errorMessage: string;
	setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FunctionComponent<Props> = ({
	validateForm,
	isFetching,
	errorMessage,
	setErrorMessage,
}) => {
	return (
		<>
			<h1 className="text-4xl font-medium text-slate-100">Log In</h1>
			<form
				className="flex flex-col space-y-4 border-2 rounded border-slate-100 bg-transparent text-slate-100 w-100 p-10 w-3/4 lg:w-1/3 md:p-16"
				action="/"
				onSubmit={(e) => validateForm(e)}
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
				<div className="relative">
					<input
						type="text"
						id="username"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_outlined"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Username
					</label>
				</div>
				<div className="relative">
					<input
						type="password"
						id="password"
						className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
						placeholder=" "
						required
					/>
					<label
						htmlFor="floating_outlined"
						className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
					>
						Password
					</label>
				</div>
				<Link className="text-sm italic underline" href="">
					Forgot your password?
				</Link>
				<button
					className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center hover:bg-blue-700 ${
						isFetching
							? "hover:cursor-not-allowed bg-blue-700"
							: "hover:cursor-pointer"
					} `}
				>
					{isFetching ? (
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
							<span>Logging In</span>
						</div>
					) : (
						<p>Log In</p>
					)}
				</button>
				<div className="w-2/3 flex flex-row items-center justify-between">
					<p className="basis-2/3">Don&#39;t have an account? </p>
					<Link
						className="basis-1/3 italic underline"
						href="/register"
					>
						Sign Up
					</Link>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
