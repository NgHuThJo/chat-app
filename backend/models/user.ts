import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default model("User", UserSchema);
