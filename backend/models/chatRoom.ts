import { model, Schema } from "mongoose";

const ChatRoomSchema = new Schema(
  {
    members: Array,
  },
  {
    timestamps: true,
  }
);

export default model("ChatRoom", ChatRoomSchema);
