const express = require('express');
const stuRouter  = express.Router();
const studentControl=require("../controller/studentcontroller")


stuRouter.get("/",studentControl.first)

stuRouter.post("/",studentControl.second)

//have to put these routes above id urls because cse and join were considered as :id
stuRouter.get("/cse",studentControl.sixth)

stuRouter.get("/join",studentControl.seventh)

stuRouter.put("/:id",studentControl.third)

stuRouter.delete("/:id",studentControl.fourth)

stuRouter.get("/:id",studentControl.fifth)



module.exports = stuRouter;

