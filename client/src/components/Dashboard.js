import React from 'react'
import "./Dashboard.css"
import { Outlet,useNavigate,useParams} from 'react-router-dom'
import axios from 'axios';

const Dashboard = () => {
  const params=useParams();
  const userId=params.id;
  // console.log(userId)
  const navigate = useNavigate();

  const logoutUser=async()=>{
    await axios.post("http://localhost:4000/user/logout",{"headers":{
      authorization:`Bearer ${localStorage.getItem('LoginToken')}`
    }})
    .then((res)=>{
        localStorage.removeItem('LoginToken');
        navigate("/")
        alert(res.data)
    })
    .catch((err)=>{
      console.log(err)
      alert(err)
    })
  }

  return (
    <div className='dashboard'>
    <div className='dashnav'>
      <button className='navbtn' onClick={()=>{navigate("/user/"+userId)}}>Home</button>
      <button className='navbtn' onClick={()=>{navigate("/user/"+userId+"/search")}}>Search</button>
      <button className='navbtn' onClick={()=>{navigate("/user/"+userId+"/profile")}}>Profile</button>
      <button className='navbtn' onClick={()=>{navigate("/user/"+userId+"/chat")}}>Chat</button>
      <button className='navbtn' onClick={()=>{navigate("/user/"+userId+"/notification")}}>Notification</button>
      <button className='navbtn' onClick={logoutUser}>Logout</button>
    </div>
    <div className='navdisp'>
      <Outlet/>
    </div>
    </div>
  )
}

export default Dashboard
