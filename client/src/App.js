import React from 'react'
import { Outlet} from 'react-router-dom'
import "./App.css"
import { useNavigate,useParams } from 'react-router-dom'
import {v4 as uuidv4} from "uuid"
import { useState,useEffect } from 'react'
import {io} from "socket.io-client"

const App = () => {
  const params=useParams();
  const userId=params.id;
  const [socket,setSocket]=useState(null)

  useEffect(()=>{
    return ()=>{
    setSocket(io("http://localhost:4000"))
    }
  },[])
 
  
  const navigate=useNavigate();
  const roomId= uuidv4()

  const [room,setRoom]=useState("")

  return (
    <div className='join'>
    <div className='nav'>
      <button onClick={()=>{navigate("/user/"+userId+"/chat/"+roomId)}}>Create Room</button>
      <input className="roomid" placeholder="Join Room" value={room} onChange={(e)=>setRoom(e.target.value)}></input>
      <button onClick={()=>{navigate("/user/"+userId+"/chat/"+room)}}>Join Room</button>
      <button onClick={()=>{navigate("/user/"+userId+"/chat")}}>Leave Room</button>
    </div>
    <div className='bg'>
      <Outlet context={{socket}}/>
    </div>
    </div>
  )
}

export default App

