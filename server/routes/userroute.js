const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, editUserProfile, searchUser, getFollowers, getFollowing } = require("../controller/usercontroller")
const validateUser = require("../validator/userValidator")
const editUser = require("../validator/userEditValidator")
const checkJwt = require("../jwt middleware/checkjwt")


router.put("/:username", [editUser, checkJwt], editUserProfile)

//search @ to list all users
router.get("/:firstname", checkJwt, searchUser)

router.get("/profile/:username", checkJwt, getUserProfile)

router.post("/register", validateUser, registerUser)

router.post("/login", loginUser)

router.post("/logout", checkJwt, logoutUser)

router.get("/followers/:username", checkJwt, getFollowers)

router.get("/following/:username", checkJwt, getFollowing)

module.exports = router;