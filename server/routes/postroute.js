const express = require('express');
const postrouter  = express.Router();
const postControl=require("../controller/postController")


postrouter.get("/:id",postControl.first)

postrouter.post("/",postControl.second)

postrouter.put("/:id",postControl.third)

postrouter.delete("/:id",postControl.fourth)

module.exports = postrouter;

