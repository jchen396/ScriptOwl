import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
	username: string;
	password: string;
	email: string;
	points: number;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
	password: { type: String, require: true },
	email: { type: String, required: true },
	points: { type: Number },
});

// 3. Create a Model.
export const User = model<IUser>("User", userSchema);
