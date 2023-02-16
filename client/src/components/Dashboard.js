import React, { useEffect,useState } from 'react'
import "./Dashboard.css"
import { Outlet,useNavigate,useParams} from 'react-router-dom'

const Dashboard = () => {
  const params=useParams();
  const userDash=params.id;
  console.log(userDash)
  const navigate = useNavigate();
  return (
    <div className='dashboard'>
    <div className='dashnav'>
      <button className='navbtn' onClick={()=>{navigate("/")}}>Search</button>
      <button className='navbtn' onClick={()=>{navigate("/")}}>Profile</button>
      <button className='navbtn' onClick={()=>{navigate("/")}}>Chat</button>
      <button className='navbtn' onClick={()=>{navigate("/")}}>Notification</button>
      <button className='navbtn' onClick={()=>{navigate("/")}}>Logout</button>
    </div>
    <div className='navdisp'>
      <Outlet/>
    </div>
    </div>
  )
}

export default Dashboard
