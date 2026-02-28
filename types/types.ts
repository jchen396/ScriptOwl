export interface IDate {
    date: string;
}

export type WatchedPost = {
    postId: string;
    createdAt: IDate;
};

export interface IUser {
    [key: string]:
        | Array<string>
        | string
        | number
        | boolean
        | Array<WatchedPost>
        | Array<{ id: string }>;
    username: string;
    password: string;
    readonly id: string;
    email: string;
    avatarKey: string;
    points: number;
    followers: Array<{ id: string }>;
    following: Array<{ id: string }>;
    friends: Array<{ id: string }>;
    likedCommentsIds: Array<string>;
    dislikedCommentsIds: Array<string>;
    likedPostsIds: Array<string>;
    dislikedPostsIds: Array<string>;
    uploadedPostIds: Array<string>;
    watchHistory: Array<WatchedPost>;
    isVerified: boolean;
    verificationCode: number;
}

export interface IPublisher {
    readonly id: string;
    username: string;
    avatarKey: string;
    followers: Array<string>;
    following: Array<string>;
    friends: Array<string>;
}

export interface IComment {
    readonly id: string;
    commenter: IUser;
    comment: string;
    timestamp: string;
    likes: number;
    dislikes: number;
    createdAt: IDate;
}

export interface IPost {
    readonly id: string;
    videoKey: string;
    title: string;
    description?: string;
    category?: string;
    publisher: IPublisher;
    likes: number;
    dislikes: number;
    views: number;
    transcript: string;
    createdAt: IDate;
    comments: IComment[];
    duration: number;
    thumbnail: string;
}

export interface IChatMessage {
    sender: string;
    receiver: string;
    content: string;
    time: number;
    avatarKey: string;
}

export interface IChat {
    readonly id: string;
    roomId: string;
    messages: IChatMessage[];
}
