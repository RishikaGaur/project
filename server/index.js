// const mongoose=require("mongoose");
const express=require("express");
const app=express();
const userRouter=require("./routes/userroute")
const stuRouter=require("./routes/studentroute")
const jwtRouter=require("./routes/jwtroute")
const nodemailer=require("nodemailer")
const imgRouter=require("./routes/imgroute")
// const logger=require("morgan")
// app.use(logger("dev"))

const bodyparser=require("body-parser")
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//config
const dotenv = require("dotenv");
dotenv.config();

//connection to database

// mongoose.set("strictQuery", false);

// const db= process.env.MONGOLAB_URI;

// //can also use 
// // mongoose.createConnection("")
// mongoose.connect(db).then(()=>{
//     console.log("connected to mongodb");
// }).catch(err=>{
//     console.log(err)
// })


//signup and signin api

// app.use("/", userRouter)

//jwt sign and verify

// app.use("/token",jwtRouter)


//student api

app.use("/student",stuRouter)

//email sender using nodemailer- cannot clear the security barrier of gmail
// app.post("/send/email",async(req,res)=>{
//     let transport = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.ACC,
//           pass: process.env.PASS
//         }
//     });

//     let message = {
//         from: process.env.ACC,
//         to: process.env.ACC,
//         subject: "Testing Sending Emails",
//         text: "Hello how are  you?"
//         //html:"<h1>hello</h1>"
//         // attachments:[
//         //     {
//         //         filename:"",
//         //         path:"",
//         //         cid:""
//         //     }
//         // ]
//     }
//     transport.sendMail(message, (err, info)=>{
//         if (err) {
//           console.log(err)
//         } else {
//           console.log(info);
//         }
//     })
// })


//gallery - still in progress
//multer
// app.use("/image",imgRouter)



//server

// require("http").createServer(app).listen(3000)

app.listen(3000, function(){
    console.log("App is running on Port 3000");
});