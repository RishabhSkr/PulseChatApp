import { Schema, Types, model } from "mongoose";
import mongoose from "mongoose";

const messageSchema = new Schema({
    content: {
        type: String,
    },
    attachments: [
        {
            public_id : {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    chat: {
        type: Types.ObjectId,
        ref: "Chat",
        required: true
    },
    sender: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },

},
    {
        timestamps: true
    }
);

export const Message = mongoose.model("Message", messageSchema);

