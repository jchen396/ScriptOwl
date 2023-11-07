import { FunctionComponent } from "react";

type Props = {};

const Profile: FunctionComponent<Props> = () => {
	return (
		<>
			<div className="h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-10">
				<h1 className="text-white">Test</h1>
			</div>
		</>
	);
};

export default Profile;
