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
import TranscriptSection from "@/components/Watch/TranscriptSection";
import SectionTabs from "@/components/Watch/SectionTabs";
import ChatGPTSection from "@/components/Watch/ChatGPTSection";

interface Props {
	post: IPost;
}

const Watch: NextPage<
	InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ post }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [section, setSection] = useState<string>("comment");
	const [updateUserMutate] = useMutation(UPDATE_USER);
	const [isSSR, setIsSSR] = useState(true);
	const { currentUser } = useSelector((state: any) => state.user);
	const { timeNumber, timeWord } = getTimeDiff(parseInt(post.createdAt.date));
	const [wordSelected, setWordSelected] = useState<string | null>("");
	const [chatReply, setChatReply] = useState<string | null>("");
	const [chatLoading, setChatLoading] = useState<boolean>(false);
	const [service, setService] = useState<string>("");
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
	const getSectionComponent = () => {
		if (section === "comment") {
			return (
				<CommentSection
					post={post}
					currentUser={currentUser}
					refreshUserData={refreshUserData}
					refreshSSRProps={refreshSSRProps}
				/>
			);
		}
		if (section === "transcript") {
			return (
				<TranscriptSection
					transcript={post.transcript}
					setWordSelected={setWordSelected}
					setSection={setSection}
					setChatReply={setChatReply}
					setChatLoading={setChatLoading}
					setService={setService}
					currentUser={currentUser}
				/>
			);
		}
		if (section === "ChatGPT") {
			return (
				<ChatGPTSection
					transcript={post.transcript}
					wordSelected={wordSelected}
					chatReply={chatReply}
					setChatReply={setChatReply}
					chatLoading={chatLoading}
					setChatLoading={setChatLoading}
					service={service}
				/>
			);
		}
	};
	useEffect(() => {
		setIsSSR(false);
	}, []);
	return (
		<>
			{!isSSR && (
				<div className="h-full w-full flex flex-row flex-wrap items-center justify-center space-y-10 font-mono p-10">
					<VideoSection
						currentUser={currentUser}
						post={post}
						timeNumber={timeNumber}
						timeWord={timeWord}
						refreshUserData={refreshUserData}
					/>
					<div className="basis-1/3 h-screen w-full flex flex-col justify-center items-center text-white ">
						<SectionTabs
							post={post}
							section={section}
							setSection={setSection}
							service={service}
						/>
						{getSectionComponent()}
					</div>
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
		fetchPolicy: "no-cache",
	});
	return {
		props: { post: data.post },
	};
}

export default Watch;
