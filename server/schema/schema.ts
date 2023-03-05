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
} from "graphql";

// User Type
const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		username: { type: GraphQLString },
		password: { type: GraphQLID },
		email: { type: GraphQLID },
		points: { type: GraphQLInt },
	}),
});
// Post Type
const PostType = new GraphQLObjectType({
	name: "Post",
	fields: () => ({
		id: { type: GraphQLID },
		videoId: { type: GraphQLID },
		description: { type: GraphQLString },
		title: { type: GraphQLString },
		likes: { type: GraphQLInt },
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
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find();
			},
		},
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Post.findById(args.id);
			},
		},
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find();
			},
		},
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return User.findById(args.id);
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
				const user = new User({
					username: args.username,
					password: args.password,
					email: args.email,
				});
				return user.save();
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
				videoId: { type: GraphQLNonNull(GraphQLID) },
				title: { type: GraphQLNonNull(GraphQLString) },
				description: { type: GraphQLString },
				publisher: { type: GraphQLNonNull(GraphQLID) },
				likes: { type: GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, args) {
				const post = new Post({
					videoId: args.videoId,
					title: args.title,
					description: args.description,
					publisher: args.publisher,
					likes: args.likes,
				});
				return post.save();
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
