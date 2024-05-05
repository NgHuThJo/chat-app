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
      minlength: 1,
    },
  },
  posts: [
    {
      message: String,
      to: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
});

export default model("User", UserSchema);
