import React from "react";
import HeroSection from "@/components/Home/HeroSection";
import Info from "@/components/Home/Info";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

interface Props {}

const Home: React.FunctionComponent<Props> = ({}) => {
	return (
		<div className="flex flex-wrap items-center justify-center text-white space-y-10 font-mono ">
			<HeroSection />
			<hr className="border border-gray-700 w-3/4 " />
			<Info />
		</div>
	);
};

export default Home;
