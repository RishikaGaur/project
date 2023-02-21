const express = require('express');
const router = express.Router();
const { getAllPost, createPost, updatePost, delPost, getUserPost } = require("../controller/postcontroller")
const checkSession=require("../session middleware/check")

router.get("/:username", getUserPost)

router.post("/:username", createPost)

router.put("/:id", updatePost)

router.put("/del/:id", delPost)

router.get("/", checkSession,getAllPost)


module.exports = router;

