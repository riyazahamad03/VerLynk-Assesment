const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const commentController = require("../controllers/comment_blog");

router.post("/add", checkAuth, commentController.addComment);
router.delete(
  "/:blogId/:commentId",
  checkAuth,
  commentController.deleteComment
);
router.post("/:blogId/:commentId", checkAuth, commentController.updateComment);

module.exports = router;
