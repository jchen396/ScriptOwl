import { GET_POST_BY_ID } from "@/graphql/queries/getPostById";
import { useEffect, useState } from "react";
import React from "react";
import client from "../../../apollo-client";
import { useSelector } from "react-redux";
import { getTimeDiff } from "@/functions/getTimeDiff";
import VideoSection from "@/components/Watch/VideoSection";
import CommentSection from "@/components/Watch/CommentSection";
import { IPost } from "../../../../types/types";
import { UPDATE_USER } from "@/graphql/mutations/updateUser";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux/apiCalls";
import { useMutation } from "@apollo/client";
import { InferGetServerSidePropsType, NextPage } from "next";

interface Props {
	post: IPost;
}

const Watch: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ post }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [updateUserMutate] = useMutation(UPDATE_USER);
	const [isSSR, setIsSSR] = useState(true);
	const { currentUser } = useSelector((state: any) => state.user);
	const { timeNumber, timeWord } = getTimeDiff(parseInt(post.createdAt.date));
	const refreshSSRProps = () => {
		router.replace(router.asPath);
	};
	const refreshUserData = async () => {
		const id = currentUser.id;
		const { data } = await updateUserMutate({
			variables: {
				id,
			},
		});
		updateUser(dispatch, data.updateUser);
		refreshSSRProps();
	};
	useEffect(() => {
		setIsSSR(false);
	}, []);
	return (
		<>
			{!isSSR && (
				<div className="h-screen w-screen flex flex-row items-center justify-start space-y-10 font-mono p-6 pt-20 ">
					<VideoSection
						currentUser={currentUser}
						post={post}
						timeNumber={timeNumber}
						timeWord={timeWord}
						refreshUserData={refreshUserData}
					/>
					<CommentSection
						post={post}
						currentUser={currentUser}
						refreshUserData={refreshUserData}
						refreshSSRProps={refreshSSRProps}
					/>
				</div>
			)}
		</>
	);
};

export async function getServerSideProps(context: any) {
	const { data } = await client.query({
		query: GET_POST_BY_ID,
		variables: {
			id: context.query.v,
		},
	});
	return {
		props: { post: data.post },
	};
}

export default Watch;
