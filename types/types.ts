export interface IDate {
	date: string;
}

export interface IUser {
	[key: string]: Array<string> | string | number | boolean;
	username: string;
	password: string;
	readonly id: string;
	email: string;
	avatarKey: string;
	points: number;
	likedCommentsIds: Array<string>;
	dislikedCommentsIds: Array<string>;
	likedPostsIds: Array<string>;
	dislikedPostsIds: Array<string>;
	isVerfied: boolean;
	verificationCode: number;
}

export interface IPublisher {
	username: string;
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
