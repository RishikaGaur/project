import React, { useEffect,useState } from 'react'
import "./Dashboard.css"
import { Outlet,useNavigate} from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className='dashboard'>
    <div className='dashnav'>
      <button onClick={()=>{navigate("/")}}>Search</button>
      <button onClick={()=>{navigate("/")}}>Profile</button>
      <button onClick={()=>{navigate("/")}}>Notification</button>
      <button onClick={()=>{navigate("/")}}>Logout</button>
    </div>
    <div className='navdisp'>
      <Outlet/>
    </div>
    </div>
  )
}

export default Dashboard
