import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    value: {
      minlength: 4,
    },
  },
});

export default model("User", UserSchema);
