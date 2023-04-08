import { Schema, model } from "mongoose";
import { IPost } from "./../../types/types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<IPost>(
	{
		title: { type: String, required: true },
		videoKey: { type: String, required: true },
		description: { type: String },
		publisher: { type: Schema.Types.ObjectId, required: true, ref: "User" },
		category: { type: String },
		likes: { type: Number, required: true },
		dislikes: { type: Number, required: true },
		views: { type: Number, required: true },
		transcript: { type: String },
		comments: { type: [Object] },
		duration: { type: Number },
		thumbnail: { type: String },
	},
	{
		timestamps: true,
	}
);

// 3. Create a Model.
export const Post = model<IPost>("post", postSchema);
