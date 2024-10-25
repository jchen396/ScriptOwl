import { getTimeDiff } from "@/functions/getTimeDiff";
import { INCREMENT_VIEW_COUNT } from "@/graphql/mutations/incrementViewCount";
import { useMutation } from "@apollo/client";
import { IPost } from "../../../../types/types";
import React from "react";
import VideoPost from "./VideoPost";

interface Props {
    posts: IPost[];
}

const VideoGrid: React.FunctionComponent<Props> = ({ posts }) => {
    const [incrementViewCount] = useMutation(INCREMENT_VIEW_COUNT);
    return (
        <div className="w-full p-4 flex flex-col justify-center items-center space-y-4">
            <div className="w-full grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {posts &&
                    posts.map((post: IPost, key: number) => {
                        const { timeNumber, timeWord } = getTimeDiff(
                            parseInt(post.createdAt.date)
                        );
                        return (
                            <div
                                key={key}
                                className="group w-full hover:bg-gray-800 p-2 hover:cursor-pointer rounded-lg"
                                onClick={() => {
                                    incrementViewCount({
                                        variables: {
                                            postId: post.id,
                                            views: post.views + 1,
                                            publisherId: post.publisher.id
                                                ? post.publisher.id
                                                : null,
                                        },
                                    });
                                }}
                            >
                                <VideoPost
                                    post={post}
                                    timeNumber={timeNumber}
                                    timeWord={timeWord}
                                />
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default VideoGrid;
