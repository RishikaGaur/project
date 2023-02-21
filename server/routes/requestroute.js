const express = require('express');
const router = express.Router();
const { sendRequest, acceptRequest, rejectRequest, getPendingRequest, removeFollower, removeFollowing } = require("../controller/requestcontroller")
const checkJwt = require("../jwt middleware/checkjwt")

router.put("/accept/:id", checkJwt, acceptRequest)

router.put("/reject/:id", checkJwt, rejectRequest)

router.get("/:username", checkJwt, getPendingRequest)

router.post("/", checkJwt, sendRequest)

//user is self username
router.put("/removefollower/:user", checkJwt, removeFollower)

router.put("/removefollowing/:user", checkJwt, removeFollowing)

module.exports = router;