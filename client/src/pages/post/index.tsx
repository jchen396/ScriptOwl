import { ADD_POST } from "@/graphql/mutations/addPost";
import { useMutation } from "@apollo/client";
import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { postVideo } from "@/functions/s3_functions/postVideo";
import PostForm from "@/components/Post/PostForm";
import { updateUser } from "@/redux/apiCalls";

type Props = {};

const Post: FunctionComponent<Props> = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [posted, setPosted] = useState<boolean>(false);
	const [videoFile, setVideoFile] = useState<File>();
	const [title, setTitle] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [category, setCategory] = useState<string>();
	const [addPost, { loading }] = useMutation(ADD_POST);
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const { currentUser } = useSelector((state: any) => state.user);
	const onSubmitHandler = async (e: FormEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault();
			setPosted(true);
			let result;
			if (videoFile) {
				result = await postVideo({ videoFile });
			} else {
				setPosted(false);
				setErrorMessage("Please select a file to upload.");
				return;
			}
			if (title === undefined || title === "") {
				setPosted(false);
				setErrorMessage("Please provide a title for the post.");
				return;
			}
			const videoData = JSON.parse(
				result.result.replace(/(\r\n|\n|\r)/gm, "")
			);
			const { data } = await addPost({
				variables: {
					videoKey: result.key,
					title,
					description,
					category,
					publisher: currentUser.id,
					transcript: videoData.text,
					duration: videoData.duration,
					thumbnail: result.thumbnailKey,
				},
			});
			setSuccessMessage("Uploaded successfully!");
			updateUser(dispatch, data.addPost);
			setErrorMessage("");
			setPosted(false);
		} catch (e) {
			setErrorMessage(e);
			setSuccessMessage("");
		}
	};
	useEffect(() => {
		if (!currentUser) {
			router.push("/login");
		}
	}, [currentUser, router]);
	return (
		<>
			<PostForm
				onSubmitHandler={onSubmitHandler}
				posted={posted}
				setVideoFile={setVideoFile}
				setTitle={setTitle}
				setDescription={setDescription}
				setCategory={setCategory}
				loading={loading}
				successMessage={successMessage}
				setSuccessMessage={setSuccessMessage}
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
				currentUser={currentUser}
			/>
		</>
	);
};

export default Post;
