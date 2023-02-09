const express = require('express');
const requestRouter  = express.Router();
const userControl=require("../controller/usercontroller")
const validateUser=require("../validator/userValidator")
const editUser=require("../validator/userEditValidator")


requestRouter.put("/:id",editUser,userControl.method4)

requestRouter.get("/:id",userControl.method5)

requestRouter.get("/",userControl.method1)

requestRouter.put("/register",validateUser,userControl.method2)

requestRouter.post("/login",userControl.method3)


module.exports = requestRouter;