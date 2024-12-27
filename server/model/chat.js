import { Schema, Types, model } from "mongoose";
import mongoose from "mongoose";
const chatSchema = new Schema({
    name: {
        type: String,
        required: true,

    },
    groupChat: {
        type: Boolean,
        default: false
    },
    creator: {
        type: Types.ObjectId,
        ref: "User",
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    members: [
        {
            type: Types.ObjectId,
            ref: "User"
        }
    ],
},
    {
        timestamps: true
    }
);

export const Chat = mongoose.model("Chat", chatSchema);

