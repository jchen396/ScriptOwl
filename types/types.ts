export interface IDate {
	date: string;
}

export interface IUser {
	[key: string]: string | number;
	username: string;
	password: string;
	id: string;
	email: string;
	avatarKey: string;
	points: number;
}

export interface IPublisher {
	username: string;
}

export interface IComment {
	id: string;
	commenter: IUser;
	comment: string;
	timestamp: string;
	likes: number;
	dislikes: number;
	createdAt: IDate;
}

export interface IPost {
	id: string;
	videoKey: string;
	title: string;
	description?: string;
	category?: string;
	publisher: IPublisher;
	likes: number;
	dislikes: number;
	views: number;
	createdAt: IDate;
	comments: IComment[];
}
