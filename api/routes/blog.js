const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blog");

router.post("/create", blogController.create_blog);
router.post("/update", blogController.update_blog);
router.get("/:blogId", blogController.get_specific_blog);
router.delete("/:blogId", blogController.delete_blog);
module.exports = router;
