import { Schema, model, Types } from "mongoose";
// 1. Create an interface representing a document in MongoDB.
interface IPost {
	id: string;
	videoId: string;
	publisherId: Types.ObjectId;
	likes: number;
}

// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<IPost>({
	id: { type: String, required: true },
	videoId: { type: String, required: true },
	publisherId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
	likes: { type: Number, required: true },
});

// 3. Create a Model.
export const Post = model<IPost>("post", postSchema);
