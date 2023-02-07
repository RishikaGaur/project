const express=require("express")
const app=express()

const http=require("http")

const cors=require("cors")
const {Server}=require("socket.io")

app.use(cors())
const server=http.createServer(app)

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

server.listen(3001,()=>{
    console.log("listening")

})