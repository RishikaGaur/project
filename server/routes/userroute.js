const express = require('express');
const userRouter  = express.Router();
const userControl=require("../controller/usercontroller")
const validateUser=require("../validator/userValidator")
const editUser=require("../validator/userEditValidator")


userRouter.put("/:id",editUser,userControl.method4)

userRouter.get("/:id",userControl.method5)

userRouter.get("/",userControl.method1)

userRouter.put("/register",validateUser,userControl.method2)

userRouter.post("/login",userControl.method3)


module.exports = userRouter;