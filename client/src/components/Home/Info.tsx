import React from "react";
import Services from "@/components/Home/Services";
import Showcase from "@/components/Home/Showcase";
import { useState } from "react";

const Info = () => {
	const [service, setService] = useState<string>("");
	return (
		<div className="w-full h-screen flex flex-col justify-start items-center">
			<Services setService={setService} service={service} />
			<Showcase service={service} />
		</div>
	);
};

export default Info;
