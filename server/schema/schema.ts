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
} from "graphql";
// Client Type
const UserType = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: { type: GraphQLID },
		username: { type: GraphQLID },
		password: { type: GraphQLID },
		points: { type: GraphQLInt },
	}),
});

const PostType = new GraphQLObjectType({
	name: "Post",
	fields: () => ({
		postId: { type: GraphQLID },
		videoId: { type: GraphQLID },
		title: { type: GraphQLString },
		publisher: {
			type: UserType,
			resolve(parent, args) {
				return User.findById(parent.publisherId);
			},
		},
	}),
});

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

module.exports = new GraphQLSchema({
	query: RootQuery,
});
