import React from 'react'
import './Log.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
// import { useAuthContext } from '../../AuthContext';
import axios from 'axios';

export default function Log() {
  const navigate = useNavigate();
  const [state,setState]=useState({
    username:"",
    password:""
  })

  const changeHandler = (event) => {
    const {name, value} = event.target;
    setState({
      ...state,
      [name]: value
    })
  } 

  const submitHandler = async (e) => {
    e.preventDefault()
      await axios.post("http://localhost:4000/user/login", state)
      .then((res)=>{
        console.log(res.data)
        if(res.data.status==="valid user"){
          localStorage.setItem('LoginToken', res.data.token);
          navigate("/user/"+state.username)
        }else{
        alert(res.data.status)
        }
      })
      .catch((err)=>{
        console.log(err)
        alert("Empty Fields")
      })
  }

  
  return (
    <div className="frm">
      <form className="login" method="post" action="">
        <span className='frmhead'>Log In</span>
        <label htmlFor="email">Username: </label>
        <input
          type="email"
          name="username"
          placeholder="Username"
          id="email"
          onChange={changeHandler}
        />
        <label htmlFor="pwd">Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="pwd"
          onChange={changeHandler}
        />
        <input
          type="button"
          value="Login"
          id="login"
          onClick={submitHandler}
        />
        <input
          type="button"
          value="Register New"
          id="register"
          onClick={() => navigate("/Register")}
        />
      </form>
    </div>
  );
}