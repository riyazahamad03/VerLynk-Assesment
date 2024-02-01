const mongoose = require("mongoose");
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
});

module.exports = mongoose.model("blogData", BlogSchema);
