const mongoose = require("mongoose");
const BLOG = require("../models/Blog");

exports.addComment = async (req, res, next) => {
  // {
  //     "blogId" : "65bb27022476d17c85d4a2b9",
  //     "comment" : "Hey this is the comment",
  //     "userName" : "riyaz"
  // }
  try {
    const blogId = req.body.blogId;
    const commented = req.body.comment;
    const existing_blog = await BLOG.findOne({ _id: blogId }).exec();
    if (!existing_blog) {
      return res.status(409).json({
        message: "No blog found",
      });
    }
    const newComment = {
      _id: new mongoose.Types.ObjectId(),
      comment: commented,
      userName: req.body.userName,
    };
    existing_blog.comments.push(newComment);
    await existing_blog.save();

    return res.status(200).json({
      message: "Succesfully added comments",
      data: existing_blog,
    });
  } catch (err) {
    console.log("Error in adding comment");
    return res.status(500).json({
      message: "Error in adding comment",
      error: err,
    });
  }
};

exports.updateComment = async (req, res, next) => {
  //   blog id and comment id should be passed in params
  //   {
  //     "data" : "Im Here to update new comment"
  //     "username" : "riyaz"
  // }
  try {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;
    const updateComment = req.body.data;
    const username = req.body.username;
    const existing_blog = await BLOG.find({ _id: blogId }).exec();
    // console.log(blogId , commentId);
    if (!existing_blog) {
      return res.status(404).json({
        message: "No blog found",
      });
    }
    const foundComment = existing_blog[0].comments.find((comment) =>
      comment._id.equals(commentId)
    );

    if (!foundComment) {
      return res.status(409).json({
        message: "No blog found",
      });
    }
    const commentIndex = existing_blog[0].comments.findIndex((comment) =>
      comment._id.equals(commentId)
    );
    if (existing_blog[0].comments[commentIndex].userName != username) {
      throw new Error("User name is not matching cant do this operation");
    }
    existing_blog[0].comments[commentIndex].comment = updateComment;
    const updatedBlog = await existing_blog[0].save();

    return res.status(200).json({
      message: "Successfully retrieved comment",
      data: updatedBlog,
    });
  } catch (err) {
    console.log("Error");
    return res.status(500).json({
      message: "Error in fetching comment data",
      error: err.message,
    });
  }
};

exports.deleteComment = async (req, res, next) => {
  // blog id and comment id should be passed in params
  //   {
  //     "username" : "riyaz"
  // }
  try {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;
    const username = req.body.username;

    const existing_blog = await BLOG.find({ _id: blogId }).exec();
    // console.log(blogId , commentId);
    if (!existing_blog) {
      return res.status(404).json({
        message: "No blog found",
      });
    }
    const foundComment = existing_blog[0].comments.find((comment) =>
      comment._id.equals(commentId)
    );

    if (!foundComment) {
      return res.status(409).json({
        message: "No blog found",
      });
    }
    const commentIndex = existing_blog[0].comments.findIndex((comment) =>
      comment._id.equals(commentId)
    );
    console.log(existing_blog[0].comments[commentIndex].userName, username);
    if (existing_blog[0].comments[commentIndex].userName != username) {
      throw new Error("User name is not matching cant do this operation");
    }

    existing_blog[0].comments.splice(commentIndex, 1);

    await existing_blog[0].save();

    return res.status(200).json({
      message: "Comment deleted successfully",
      data: existing_blog,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in deleting the post",
      error: err.message,
    });
  }
};
