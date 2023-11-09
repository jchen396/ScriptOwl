import { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";
import { GET_USER_BY_USERNAME } from "@/graphql/queries/getUserbyUsername";
import client from "../../../apollo-client";

type Props = {};

const Profile: FunctionComponent<Props> = () => {
	const router = useRouter();
	const username = router.query.username;
	const fetchUserInfo = async () => {
		const { data } = await client.query({
			query: GET_USER_BY_USERNAME,
			variables: {
				username,
			},
		});
		return data;
	};
	useEffect(() => {
		const data = fetchUserInfo();
		console.log(data);
	}, []);
	return (
		<>
			<div className="h-full w-full flex flex-col items-center justify-center space-y-10 font-mono py-10">
				<h1 className="text-white">Test</h1>
			</div>
		</>
	);
};

export default Profile;
