const express = require('express');
const postRouter  = express.Router();
const postControl=require("../controller/postcontroller")


postRouter.get("/:id",postControl.first)

postRouter.post("/:id",postControl.second)

postRouter.put("/:id",postControl.third)

postRouter.delete("/:id",postControl.fourth)

postRouter.get("/",postControl.fifth)


module.exports = postRouter;

