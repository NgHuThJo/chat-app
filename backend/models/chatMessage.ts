import { model, Schema } from "mongoose";

const ChatMessageSchema = new Schema({
  chatRoomId: String,
  sender: String,
  message: String,
});

export default model("ChatMessage", ChatMessageSchema);
