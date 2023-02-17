const express = require("express");
const app = express();

var cors = require('cors')
app.use(cors())

const http=require("http")
const server=http.createServer(app)
const {Server}=require("socket.io")

const postRouter = require("./routes/postroute")
const userRouter = require("./routes/userroute")
const requestRouter = require("./routes/requestroute")

global.bcrypt=require("bcrypt")
global.salt=10;
const db = require("./firebase");
global.User=db.collection("users")
global.Requests=db.collection("requests")
global.nodemailer=require("nodemailer")
global.Posts = db.collection("posts")

const bodyparser = require("body-parser")
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const dotenv = require("dotenv");
dotenv.config()


app.use("/post", postRouter)

app.use("/user", userRouter)

app.use("/request", requestRouter)



const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
});


io.on("connection",(socket)=>{
    //start
    console.log("User connected -",socket.id);

    socket.on("sendMsg",(arg,roomId)=>{
        let others=socket.broadcast;
        others=roomId ? others.to(roomId):others;
        others.emit("receiveMsg",arg)
    })

    socket.on("join-room",({roomId})=>{
        console.log("joining room")
        socket.join(roomId)
    })

    //end
    
    socket.on("disconnect",()=>{
        console.log(socket.rooms);
        socket.rooms.size === 0
        console.log("user disconnected -",socket.id)
    })
})

server.listen(4000,()=>{
    console.log("listening on port 4000")

})