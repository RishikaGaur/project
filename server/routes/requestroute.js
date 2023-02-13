const express = require('express');
const requestRouter  = express.Router();
const requestControl=require("../controller/requestcontroller")

requestRouter.put("/accept/:id",requestControl.third)

requestRouter.put("/reject/:id",requestControl.fourth)

requestRouter.get("/",requestControl.first)

requestRouter.post("/",requestControl.second)

//id is email
requestRouter.put("/removefollower/:user",requestControl.fifth)

requestRouter.put("/removefollowing/:id",requestControl.sixth)

module.exports = requestRouter;