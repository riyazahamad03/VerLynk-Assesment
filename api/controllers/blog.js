const mongoose = require("mongoose");
const BLOG = require("../models/Blog");

exports.create_blog = async (req, res, next) => {
  // {
  //     "blogData" : "Hello this is the first blog post",
  //     "userName" : "riyaz"
  // }
  try {
    const new_blog = new BLOG({
      _id: new mongoose.Types.ObjectId(),
      blogData: req.body.blogData,
      userName: req.body.userName,
    });
    const result = await new_blog.save();
    console.log(result);
    return res.status(201).json({
      message: "blog created",
      data: result,
    });
  } catch (err) {
    console.log("error in creating blog data");
    return res.status(500).json({
      message: "Error in creating blog data",
      error: err,
    });
  }
};

exports.update_blog = async (req, res, next) => {
  //   {
  //     "blogId" : "65bb2072af090d0718213c4b",
  //     "blogData" : "Hello this is the first blog post updated by updatedBlog route",
  //     "userName" : "riyaz"
  // }
  try {
    const blog_id = req.body.blogId;
    const existing_blog = await BLOG.findOne({
      _id: blog_id,
    }).exec();
    if (!existing_blog) {
      return res.status(409).json({
        message: "Cannot find the blog with blog id",
      });
    }
    existing_blog.blogData = req.body.blogData;
    const updatedBlog = await existing_blog.save();

    return res.status(200).json({
      message: "Blog updated successfully",
      updatedBlog: updatedBlog,
    });
  } catch (err) {
    console.log("Error in updating the blog");
    res.status(500).json({
      message: "cannot able to update the previous blog",
      error: err,
    });
  }
};

exports.delete_blog = async (req, res, next) => {
  // passing id in parameter
  try {
    const blogId = req.params.blogId;
    const existing_blog = BLOG.findOne({
      _id: blogId,
    }).exec();
    if (!existing_blog) {
      return res.status(409).json({
        message: "There is no matching blog found for that Id",
      });
    }
    console.log("came");
    await BLOG.findByIdAndDelete(blogId);
    return res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (err) {
    console.log("Error in fetching data");
    return res.status(500).json({
      message: "Error in fetching data",
      error: err,
    });
  }
};

exports.get_specific_blog = async (req, res, next) => {
  // passing id in parameter
  try {
    const blogId = req.params.blogId;

    const existing_blog = await BLOG.findOne({
      _id: blogId,
    }).exec();

    if (!existing_blog) {
      return res.status(409).json({
        message: "No matching blog found",
      });
    }
    console.log(existing_blog);
    return res.status(200).json({
      message: "Blog Succesfully fetched",
      data: existing_blog,
    });
  } catch (err) {
    console.log("Error in fetching blog");
    return res.status(500).json({
      message: "No blog found with blog Id",
    });
  }
};
