import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";

type Props = {};

const Contact = (props: Props) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");

	//   Form validation state
	const [errors, setErrors] = useState({});

	//   Setting button text on form submission
	const [buttonText, setButtonText] = useState("Send");

	// Setting success or failure messages states
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);

	// Validation check method
	const handleValidation = () => {
		interface ITempErrors {
			name?: boolean;
			email?: boolean;
			message?: boolean;
		}
		let tempErrors: ITempErrors = {};
		let isValid = true;

		if (name.length <= 0) {
			tempErrors["name"] = true;
			isValid = false;
		}
		if (email.length <= 0) {
			tempErrors["email"] = true;
			isValid = false;
		}
		if (message.length <= 0) {
			tempErrors["message"] = true;
			isValid = false;
		}

		setErrors({ ...tempErrors });
		return isValid;
	};

	//   Handling form submit

	const handleFormSubmit = async (e: any) => {
		e.preventDefault();

		let isValidForm = handleValidation();

		if (isValidForm) {
			setButtonText("Sending");
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}sendgrid`,
				{
					name,
					email,
					subject,
					message,
				}
			);
			const { error } = res.data;
			if (error) {
				setShowSuccessMessage(false);
				setShowFailureMessage(true);
				setButtonText("Send");
				return;
			}
			setShowSuccessMessage(true);
			setShowFailureMessage(false);
			setButtonText("Send");
		}
	};
	return (
		<div className="flex flex-col items-center justify-center space-y-10 py-10 text-white font-sans w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
			<Head>
				<title>ScriptOwl | Contact</title>
				<meta
					name="description"
					content="ScriptOwl is a video streaming site is dedicated to revolutionizing the way people learn and consume media content. By harnessing the power of GPT 3.5, we provide users with real-time translation of video transcripts, as well as a summarization feature that saves time and makes information more digestible. In addition, our quiz creation feature allows users to test their knowledge and reinforce what they've learned. Our goal is to break down language barriers and make learning more accessible to everyone, and we're constantly striving to innovate and improve the user experience. Join us on our mission to bring the world closer together through the power of video."
				/>
				<meta
					name="viewport"
					content="initial-scale=1.0, width=device-width"
				/>
				<meta
					property="og:title"
					content="
					ScriptOwl | Contact
				"
					key="title"
				/>
				<link rel="icon" href="/img/ScriptOwl_logo_transparent.png" />
			</Head>
			<h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-lg mb-6">Contact</h1>
			<form
				action="submit"
				className="flex flex-col space-y-6 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl text-slate-100 w-11/12 sm:w-3/4 lg:w-1/3 p-8 md:p-12"
				onSubmit={(e) => handleFormSubmit(e)}
			>
				<div className="relative">
					<input
						type="email"
						id="email"
						className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
						placeholder=" "
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<label
						htmlFor="email"
						className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
					>
						E-mail
					</label>
				</div>
				<div className="relative">
					<input
						type="text"
						id="name"
						className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
						placeholder=" "
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<label
						htmlFor="name"
						className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
					>
						Name
					</label>
				</div>
				<div className="relative">
					<input
						type="text"
						id="subject"
						className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
						placeholder=" "
						onChange={(e) => setSubject(e.target.value)}
						required
					/>
					<label
						htmlFor="email"
						className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
					>
						Subject
					</label>
				</div>
				<div className="relative">
					<label
						htmlFor="message"
						className="absolute text-sm text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-[#1e2532] px-2 peer-focus:px-2 peer-focus:text-cyan-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
					>
						Message
					</label>
					<textarea
						id="message"
						className="block px-4 pb-3 pt-5 w-full text-sm text-white bg-gray-900/50 rounded-xl border border-gray-600 appearance-none focus:outline-none focus:ring-0 focus:border-cyan-400 peer transition-colors"
						placeholder="Leave a comment..."
						onChange={(e) => setMessage(e.target.value)}
						required
					></textarea>
				</div>
				<button
					onClick={(e) => handleFormSubmit(e)}
					className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold py-3 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 cursor-pointer"
				>
					{buttonText}
				</button>
				{showSuccessMessage && (
					<p className="text-green-400">Message sent</p>
				)}
				{showFailureMessage && (
					<p className="text-red-400">Something went wrong</p>
				)}
			</form>
		</div>
	);
};

export default Contact;
