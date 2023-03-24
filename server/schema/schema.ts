import CryptoJS from "crypto-js";
import mongoose from "mongoose";

// Mongoose models
import { User } from "../models/User";
import { Post } from "../models/Post";
import {
	GraphQLObjectType,
	GraphQLID,
	GraphQLInt,
	GraphQLSchema,
	GraphQLList,
	GraphQLString,
	GraphQLNonNull,
	GraphQLError,
} from "graphql";
import { createTokens } from "../auth";

const DateType = new GraphQLObjectType({
	name: "Date",
	fields: () => ({
		date: {
			type: GraphQLString,
			resolve: (parent, __) => {
				return parent;
			},
		},
	}),
});

// User Type
const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		username: { type: GraphQLString },
		password: { type: GraphQLID },
		email: { type: GraphQLID },
		points: { type: GraphQLInt },
		avatarKey: { type: GraphQLString },
		createdAt: {
			type: DateType,
		},
	}),
});
// Comment Type
const CommentType = new GraphQLObjectType({
	name: "Comment",
	fields: () => ({
		id: { type: GraphQLID },
		commenter: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.commenter);
			},
		},
		comment: { type: GraphQLString },
		timestamp: { type: GraphQLString },
		likes: { type: GraphQLInt },
		dislikes: { type: GraphQLInt },
		createdAt: {
			type: DateType,
		},
	}),
});
// Post Type
const PostType = new GraphQLObjectType({
	name: "Post",
	fields: () => ({
		id: { type: GraphQLID },
		videoKey: { type: GraphQLID },
		description: { type: GraphQLString },
		title: { type: GraphQLString },
		category: { type: GraphQLString },
		likes: { type: GraphQLInt },
		dislikes: { type: GraphQLInt },
		views: { type: GraphQLInt },
		comments: { type: GraphQLList(CommentType) },
		createdAt: {
			type: DateType,
		},
		publisher: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.publisher);
			},
		},
	}),
});
// Queries
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		// Return all posts in db
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find();
			},
		},
		// Return a post by post id
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Post.findById(args.id);
			},
		},
		// Return all users in db
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find();
			},
		},
		// Return user by user id
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return User.findById(args.id);
			},
		},
		// Check token data stored in cookies
		checkTokens: {
			type: UserType,
			resolve(_, __, { res }) {
				if (!res.req.user_id) {
					return null;
				}
				return User.findById(res.req.user_id);
			},
		},
		// Sign user out by remmoving cookies tokens
		signOutUser: {
			type: UserType,
			async resolve(_, __, { res }) {
				res.clearCookie("accessToken");
				res.clearCookie("refreshToken");
			},
		},
		// Log in by username
		logInUser: {
			type: UserType,
			args: {
				username: { type: GraphQLNonNull(GraphQLString) },
				password: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(_, args, { res }) {
				return User.findOne({
					username: args.username.toLowerCase(),
				}).then((user: any) => {
					try {
						if (user === null) {
							throw new GraphQLError("User does not exist.");
						}
						const hashedPassword = CryptoJS.AES.decrypt(
							user.password,
							process.env.PASS_SEC
						);
						const originalPassword = hashedPassword.toString(
							CryptoJS.enc.Utf8
						);
						if (originalPassword === args.password) {
							const { accessToken, refreshToken } =
								createTokens(user);
							res.cookie("accessToken", accessToken, {
								httpOnly: true,
								sameSite: "None",
								secure: true,
								maxAge: 15 * 60 * 1000,
							});
							res.cookie("refreshToken", refreshToken, {
								httpOnly: true,
								sameSite: "None",
								secure: true,
								maxAge: 24 * 60 * 60 * 1000,
							});
							return user;
						} else {
							throw new GraphQLError(
								"Username and password do not match."
							);
						}
					} catch (err) {
						return err;
					}
				});
			},
		},
	},
});

//Mutations
const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: {
		// Create a user
		addUser: {
			type: UserType,
			args: {
				username: { type: GraphQLNonNull(GraphQLString) },
				password: { type: GraphQLNonNull(GraphQLID) },
				email: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return Promise.all([
					User.findOne({ username: args.username.toLowerCase() }),
					User.findOne({ email: args.email.toLowerCase() }),
				])
					.then((res) => {
						if (res[0]) {
							throw new GraphQLError(
								"Username is already taken."
							);
						} else if (res[1]) {
							throw new GraphQLError("Email is already taken.");
						} else {
							const encryptedPassword = CryptoJS.AES.encrypt(
								args.password,
								process.env.PASS_SEC
							).toString();
							const user = new User({
								username: args.username.toLowerCase(),
								password: encryptedPassword,
								email: args.email.toLowerCase(),
								points: 0,
								avatarKey: "d3b74dbd159a95a0cd27dc875a9aa104",
							});
							user.save();
							const { password, ...others } = user;
							return { ...others };
						}
					})
					.catch((err) => {
						return err;
					});
			},
		},
		// Remove user by ID
		deleteUser: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return User.findByIdAndRemove(args.id);
			},
		},
		// Add a post
		addPost: {
			type: PostType,
			args: {
				videoKey: { type: GraphQLNonNull(GraphQLID) },
				title: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLString },
				category: { type: GraphQLString },
				publisher: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const post = new Post({
					videoKey: args.videoKey,
					title: args.title,
					description: args.description,
					publisher: args.publisher,
					category: args.category,
					likes: 0,
					dislikes: 0,
					views: 0,
				});
				return post.save();
			},
		},
		// Comment a post
		commentPost: {
			type: PostType,
			args: {
				postId: { type: GraphQLNonNull(GraphQLID) },
				commenter: { type: GraphQLNonNull(GraphQLID) },
				comment: { type: GraphQLNonNull(GraphQLString) },
				timestamp: { type: GraphQLString },
			},
			resolve(parent, args) {
				return Post.findByIdAndUpdate(args.postId, {
					$push: {
						comments: {
							id: new mongoose.Types.ObjectId(),
							commenter: args.commenter,
							comment: args.comment,
							timestamp: args.timestamp,
							likes: 0,
							dislike: 0,
							createdAt: new Date(),
						},
					},
				});
			},
		},
		// Increase like count when pressed thumbs up button on commment
		likeComment: {
			type: PostType,
			args: {
				postId: { type: GraphQLNonNull(GraphQLID) },
				userId: { type: GraphQLNonNull(GraphQLID) },
				commentId: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(_, args) {
				const post = Post.findById(args.postId);
			},
		},
		// Increase view count of post
		incrementViewCount: {
			type: PostType,
			args: {
				postId: { type: GraphQLNonNull(GraphQLID) },
				views: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve(_, args) {
				return Post.findByIdAndUpdate(args.postId, {
					$set: {
						views: args.views,
					},
				});
			},
		},
		// Remove post by ID
		deletePost: {
			type: PostType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return Post.findByIdAndRemove(args.id);
			},
		},
		updateUser: {
			type: UserType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				avatarKey: { type: GraphQLString },
				password: { type: GraphQLID },
			},
			resolve(_, args) {
				let encryptedPassword;
				if (args.password) {
					encryptedPassword = CryptoJS.AES.encrypt(
						args.password,
						process.env.PASS_SEC
					).toString();
				}
				return User.findByIdAndUpdate(
					args.id,
					{
						$set: {
							avatarKey: args.avatarKey,
							password: encryptedPassword,
						},
					},
					{ new: true }
				);
			},
		},
		// Update a post
		updatePost: {
			type: PostType,
			args: {
				id: { type: GraphQLNonNull(GraphQLID) },
				title: { type: GraphQLString },
				description: { type: GraphQLString },
			},
			resolve(parent, args) {
				return Post.findByIdAndUpdate(
					args.id,
					{
						$set: {
							title: args.title,
							description: args.description,
						},
					},
					{ new: true }
				);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation,
});
