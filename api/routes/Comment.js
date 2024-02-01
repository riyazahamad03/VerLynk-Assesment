const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment_blog");

router.post("/add", commentController.addComment);
router.delete("/:blogId/:commentId", commentController.deleteComment);
router.post("/:blogId/:commentId", commentController.updateComment);

module.exports = router;
