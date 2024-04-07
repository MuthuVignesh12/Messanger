import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface IMessage {
  _id?: ObjectId;
  senderId: ObjectId | String;
  recieverId: ObjectId | String;
  message: String;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    recieverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;