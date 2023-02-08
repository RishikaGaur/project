const express=require("express");
const app=express();

const stuRouter=require("./routes/studentroute")
const postRouter=require("./routes/postroute")
const userRouter=require("./routes/userroute")

const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/student",stuRouter)

app.use("/post",postRouter)

app.use("/user",userRouter)

app.listen(3000, function(){
    console.log("App is running on Port 3000");
});


//user,post,following,request