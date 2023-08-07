const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default:
      "https://res.cloudinary.com/dhv4bjkxh/image/upload/v1691389169/m4shrs4j5tnkj73lnks9.png",
  },
  bio: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

model("User", userSchema);
