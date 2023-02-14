const express = require('express');
const userRouter  = express.Router();
const userControl=require("../controller/usercontroller")
const validateUser=require("../validator/userValidator")
const editUser=require("../validator/userEditValidator")


userRouter.put("/:id",editUser,userControl.method4)

userRouter.get("/:id",userControl.method5)

userRouter.get("/profile/:id",userControl.method1)

userRouter.post("/register",validateUser,userControl.method2)

userRouter.post("/login",userControl.method3)

userRouter.get("/logout",userControl.method6)

userRouter.get("/followers/:id",userControl.method7)

userRouter.get("/following/:id",userControl.method8)

module.exports = userRouter;