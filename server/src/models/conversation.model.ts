import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export interface IConversation {
  _id?: ObjectId;
  senderId: ObjectId | String;
  recieverId: ObjectId | String;
  message: String;
  createdAt?: Date;
  updatedAt?: Date;
}

const conversationSchema = new mongoose.Schema(
  {
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: []
    }]
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;