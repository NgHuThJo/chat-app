import { model, Schema } from "mongoose";

const ChatMessageSchema = new Schema({
  chatRoomId: {
    type: Schema.Types.ObjectId,
    ref: "ChatRoom",
  },
  sender: String,
  message: String,
});

export default model("ChatMessage", ChatMessageSchema);
