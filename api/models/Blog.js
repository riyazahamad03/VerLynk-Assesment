const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  comment: {
    type: String,
    required: true,
  },
  userName : {
    type : String
  }
});

const BlogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  blogData: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  comments: [CommentSchema],
});

module.exports = mongoose.model("blogData", BlogSchema);
