import { Schema, model, Types } from "mongoose";
// 1. Create an interface representing a document in MongoDB.
interface IPost {
	title: string;
	videoKey: string;
	description: string;
	publisher: Types.ObjectId;
	category: string;
	likes: number;
	views: number;
}

// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<IPost>({
	title: { type: String, required: true },
	videoKey: { type: String, required: true },
	description: { type: String },
	publisher: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	category: { type: String },
	likes: { type: Number, required: true },
	views: { type: Number, required: true },
});

// 3. Create a Model.
export const Post = model<IPost>("post", postSchema);
