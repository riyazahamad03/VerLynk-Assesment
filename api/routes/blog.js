const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");
const checkAuth = require("../middleware/check-auth");
router.post("/create", checkAuth, blogController.create_blog);
router.post("/update", checkAuth, blogController.update_blog);
router.get("/:blogId", blogController.get_specific_blog);
router.delete("/:blogId", checkAuth, blogController.delete_blog);
module.exports = router;
