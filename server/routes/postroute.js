const express = require('express');
const router = express.Router();
const { getAllPost, createPost, updatePost, delPost, getUserPost } = require("../controller/postcontroller")
const checkJwt = require("../jwt middleware/checkjwt")


router.get("/:username", checkJwt, getUserPost)

router.post("/:username", checkJwt, createPost)

router.put("/:id", checkJwt, updatePost)

router.put("/del/:id", checkJwt, delPost)

router.get("/", checkJwt, getAllPost)


module.exports = router;

