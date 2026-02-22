import { Schema, model } from "mongoose";
import { IChat } from "./../../types/types";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const chatSchema = new Schema<IChat>(
    {
        roomId: { type: String, required: true, unique: true },
        messages: { type: [Object] },
    },
    {
        timestamps: true,
    },
);

// 3. Create a Model.
export const Chat = model<IChat>("chat", chatSchema);
