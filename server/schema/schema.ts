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
		// return all posts in db
		posts: {
			type: new GraphQLList(PostType),
			resolve(parent, args) {
				return Post.find();
			},
		},
		// return a post by post id
		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Post.findById(args.id);
			},
		},
		// return all users in db
		users: {
			type: new GraphQLList(UserType),
			resolve(parent, args) {
				return User.find();
			},
		},
		// return user by user id
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return User.findById(args.id);
			},
		},
		// return user by username
		getUser: {
			type: UserType,
			args: {
				username: { type: GraphQLString },
				password: { type: GraphQLID },
			},
			resolve(parent, args) {
				return User.findOne({
					username: args.username,
					password: args.password,
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
				let error;
				return Promise.all([
					User.findOne({ username: args.username }),
					User.findOne({ email: args.email }),
				])
					.then((res) => {
						if (res[0]) {
							throw new GraphQLError(
								"Username is already taken."
							);
						} else if (res[1]) {
							throw new GraphQLError("Email is already taken.");
						} else {
							const user = new User({
								username: args.username,
								password: args.password,
								email: args.email,
								points: 0,
							});
							return user.save();
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
