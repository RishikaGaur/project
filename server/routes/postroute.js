const express = require('express');
const router = express.Router();
const { getAllPost, createPost, updatePost, delPost, getUserPost } = require("../controller/postcontroller")


router.get("/:username", getUserPost)

router.post("/:username", createPost)

router.put("/:id", updatePost)

router.put("/del/:id", delPost)

router.get("/", getAllPost)


module.exports = router;

