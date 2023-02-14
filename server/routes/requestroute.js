const express = require('express');
const requestRouter  = express.Router();
const requestControl=require("../controller/requestcontroller")

requestRouter.put("/accept/:id",requestControl.third)

requestRouter.put("/reject/:id",requestControl.fourth)

requestRouter.get("/",requestControl.first)

requestRouter.post("/",requestControl.second)

//user is email
requestRouter.put("/remove/:user",requestControl.fifth)

module.exports = requestRouter;