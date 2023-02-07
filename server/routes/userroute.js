const express = require('express');
const userRouter  = express.Router();
const userControl=require("../controller/usercontroller")
const validateUser=require("../validator/userValidator")

userRouter.get("/",userControl.method1)

userRouter.post("/register",validateUser,userControl.method2)

userRouter.post("/login",userControl.method3)

module.exports = userRouter;