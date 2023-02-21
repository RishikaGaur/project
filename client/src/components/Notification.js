import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Notification = () => {

  const {id}=useParams();
  const userId=id;

  const navigate=useNavigate()
  const [list,setList]=useState([])

  const getNotification=async()=>{
    await axios.get("http://localhost:4000/request/"+userId,{"headers":{
      authorization:`Bearer ${localStorage.getItem('LoginToken')}`
    }})
    .then((res)=>{
      setList(res.data)
    })
    .catch((err)=>{
      console.log(err)
      navigate("/")
    })
  }



  useEffect(()=>{
    getNotification()
  },[] )

  return (
    <div className='usernoti'>
      {list.map(c=>{
            const {id,from}=c;
            return(
              <>
         <div className='pendingreq' key={id}>
           <div className='fromname'>{from}</div>
           <button className='accept'>Accept</button>
           <button className='reject'>Reject</button>
         </div>
              </>
            )
          })}
    </div>
  )
}

export default Notification
