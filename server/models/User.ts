import { Schema, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
import { IUser } from "./../../types/types";

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>(
	{
		username: { type: String, required: true, unique: true },
		password: { type: String, require: true },
		email: { type: String, required: true, unique: true },
		points: { type: Number },
		avatarKey: { type: String },
	},
	{
		timestamps: true,
	}
);

// 3. Create a Model.
export const User = model<IUser>("User", userSchema);
