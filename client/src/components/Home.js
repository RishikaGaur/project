import React, { useEffect,useState } from 'react'
import "./Home.css"
import {useParams} from "react-router-dom"
import { useOutletContext } from 'react-router-dom'

const Home = () => {
  const {socket}=useOutletContext();
  console.log(socket)
  const params=useParams();
  const [msg,setMsg]=useState("")
  const [chat,setChat]=useState([])
  
  const roomId=params.roomId

  useEffect(()=>{
    if(socket){
      return ()=>{
        console.log(roomId)
        socket.emit("join-room",{roomId: roomId})
      }
    }
  },[params])

  useEffect(()=>{
    if(socket){

      return ()=>{
        socket.on("receiveMsg",(rarg)=>{
          console.log(rarg)
          setChat(chat => [...chat,{message:rarg,received:true}])
          console.log(chat)
        })
    
      }
    }
    },[socket])


  const handleSubmit=()=>{
    socket.emit("sendMsg",msg,roomId)
    setChat(chat => [...chat,{message:msg,received:false}])
    setMsg("")
  }


  const handleKeyDown=(event)=>{
    if(event.key ==="Enter"){
      handleSubmit()
    }
  }

  return (
    <>
      <div className='container'>
        <div className='child'>
          <span className='RoomId'>{roomId}</span>
          {
            chat.map(n=>{
              return <div key={n.message} className={n.received ? "second":"first"}>{n.message}</div>
            })
          }
        </div>
        <div className='ip'>
          <input className='msg' placeholder="Type your message" value={msg} onChange={(e)=>setMsg(e.target.value)} onKeyDown={handleKeyDown}></input>
          <span className='send' onClick={handleSubmit}>Send</span>
        </div>
      </div>
    </>
  )
}

export default Home
