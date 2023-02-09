const express=require("express");
const app=express();

const postRouter=require("./routes/postroute")
const userRouter=require("./routes/userroute")
const requestRouter=require("./routes/requestroute")


const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/post",postRouter)

app.use("/user",userRouter)

app.use("/request",requestRouter)

app.listen(3000, function(){
    console.log("App is running on Port 3000");
});