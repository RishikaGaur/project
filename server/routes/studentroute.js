const express = require('express');
const stuRouter  = express.Router();
const studentControl=require("../controller/studentcontroller")


stuRouter.get("/",studentControl.first)

stuRouter.post("/",studentControl.second)

stuRouter.put("/:id",studentControl.third)

stuRouter.delete("/:id",studentControl.fourth)

stuRouter.get("/:id",studentControl.fifth)



module.exports = stuRouter;

