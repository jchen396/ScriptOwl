import Image from "next/image";
import React from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className="w-full self-end bg-transparent border-t border-gray-700 font-mono flex md:flex-row flex-col space-y-4 md:space-y-0 justify-around items-center py-4">
			<div className="flex flex-col justify-center items-start text-white text-lg">
				<Link href={"/"}>Contact</Link>
				<Link href={"/"}>About</Link>
				<Link href={"/"}>Pricing</Link>
			</div>
			<div className="flex flex-col justify-center items-center">
				<div className="flex flex-row justify-center items-center">
					<Image
						width={100}
						height={100}
						src="/img/ScriptOwl_logo_transparent.png"
						className="h-20 w-20 mr-3"
						alt="Flowbite Logo"
					/>
					<span className="self-center text-xl whitespace-nowrap dark:text-white">
						ScriptOwl
					</span>
				</div>
				<p className="text-white">
					Copyright © 2023 ScriptOwl. All rights reserved.
				</p>
			</div>
			<div className="flex flex-col text-white">
				<div className="flex flex-row space-x-2">
					<MailOutlineIcon />
					<p>support@jackiedev.com</p>
				</div>
				<Link
					className="self-center"
					href="https://github.com/jchen396/ScriptOwl"
				>
					<GitHubIcon sx={{ fontSize: 25 }} />
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
