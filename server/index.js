const express=require("express");
const app=express();

const stuRouter=require("./routes/studentroute")
const userRouter=require("./routes/userroute")

const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use("/student",stuRouter)

app.use("/",userRouter)

app.listen(3000, function(){
    console.log("App is running on Port 3000");
});