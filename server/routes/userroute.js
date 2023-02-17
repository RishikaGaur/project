const express = require('express');
const router  = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, editUserProfile, searchUser, getFollowers, getFollowing }=require("../controller/usercontroller")
const validateUser=require("../validator/userValidator")
const editUser=require("../validator/userEditValidator")


router.put("/:username",editUser,editUserProfile)

//search @ to list all users
router.get("/:firstname",searchUser)

router.get("/profile/:username",getUserProfile)

router.post("/register",validateUser,registerUser)

router.post("/login",loginUser)

router.get("/logout",logoutUser)

router.get("/followers/:username",getFollowers)

router.get("/following/:username",getFollowing)

module.exports = router;