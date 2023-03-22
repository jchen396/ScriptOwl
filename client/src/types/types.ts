export interface IDate {
	date: string;
}

export interface IUser {
	[key: string]: string;
	username: string;
	password: string;
	id: string;
	email: string;
	avatarKey: string;
}

export interface IPublisher {
	username: string;
}

export interface IComment {
	commenter: IUser;
	comment: string;
	timestamp: string;
	likes: number;
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
	views: number;
	createdAt: IDate;
	comments: IComment[];
}
