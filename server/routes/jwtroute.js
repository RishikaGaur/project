const express = require('express');
const jwtRouter  = express.Router();
const jwtControl=require("../controller/jwtcontroller")

jwtRouter.post("/", jwtControl.one)

jwtRouter.get("/", jwtControl.two)

module.exports = jwtRouter;