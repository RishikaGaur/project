import React from 'react'
import { useEffect ,useState} from 'react';
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'


const Profile = () => {
  
  const {id}=useParams();
  const userId=id;

  const navigate=useNavigate()
  const [list,setList]=useState([])

  const getProfile=async()=>{
    await axios.get("http://localhost:4000/user/profile/"+userId,{"headers":{
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
    getProfile()
  },[] )



  return (
    <div className='userprofile'>
    {list.map(c=>{
          const {id,from}=c;
          return(
            <>
       <div className='userdetails' key={id}>
         <div className=''>{from}</div>
         <button className='reject'>Edit Profile</button>
       </div>
            </>
          )
        })}
  </div>
  )
}

export default Profile
