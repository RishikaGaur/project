import React from 'react'
import { Outlet} from 'react-router-dom'
import "./App.css"
import { useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from "uuid"
import { useState,useEffect } from 'react'
import {io} from "socket.io-client"

const App = () => {
  const [socket,setSocket]=useState(null)

  useEffect(()=>{
    return ()=>{
    setSocket(io("http://localhost:3001"))
    }
  },[])
 
  
  const navigate=useNavigate();
  const roomId= uuidv4()

  const [room,setRoom]=useState("")

  return (
    <div className='join'>
    <div className='nav'>
      <button onClick={()=>{navigate("/home/"+roomId)}}>Create Room</button>
      <input className="roomid" placeholder="Join Room" value={room} onChange={(e)=>setRoom(e.target.value)}></input>
      <button onClick={()=>{navigate("/home/"+room)}}>Join Room</button>
      <button onClick={()=>{navigate("/")}}>Leave Room</button>
    </div>
    <div className='bg'>
      <Outlet context={{socket}}/>
    </div>
    </div>
  )
}

export default App

