import { IUser } from "@/types/types";
import React from "react";

type Props = {
	currentUser: IUser;
};

const Points: React.FunctionComponent<Props> = ({ currentUser }) => {
	return (
		<>
			<div className="w-full flex flex-col items-center ">
				<p className="text-2xl">Points: {currentUser.points}</p>
			</div>
		</>
	);
};

export default Points;
