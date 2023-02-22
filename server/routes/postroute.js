const express = require('express');
const router = express.Router();
const { getAllPost, createPost, updatePost, delPost, getUserPost,likePost,commentPost } = require("../controller/postcontroller")
const checkJwt = require("../jwt middleware/checkjwt")


router.get("/:username", checkJwt, getUserPost)

router.post("/:username", checkJwt,createPost)

router.post("/like/:id",checkJwt,likePost)

router.post("/comment/:id",checkJwt,commentPost)

router.put("/:id", checkJwt, updatePost)

router.put("/del/:id", checkJwt, delPost)

router.get("/",checkJwt, getAllPost)


module.exports = router;

