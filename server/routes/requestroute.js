const express = require('express');
const router = express.Router();
const { sendRequest, acceptRequest, rejectRequest, getPendingRequest, removeFollower, removeFollowing } = require("../controller/requestcontroller")

router.put("/accept/:id", acceptRequest)

router.put("/reject/:id", rejectRequest)

router.get("/:username", getPendingRequest)

router.post("/", sendRequest)

//user is self username
router.put("/removefollower/:user", removeFollower)

router.put("/removefollowing/:user", removeFollowing)

module.exports = router;