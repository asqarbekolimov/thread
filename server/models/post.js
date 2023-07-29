const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const postSchema = new Schema({
  // title: {
  //   type: String,
  //   required: true,
  // },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
});
model("Post", postSchema);
