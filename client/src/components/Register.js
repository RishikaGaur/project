import React from 'react'
import './Register.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [state,setState]=useState({
    username:"",
    password:"",
    firstname:"",
    lastname:"",
    country:"",
    gender:"",
    dob:""
  })

  const changeHandler = (event) => {
    const {name, value} = event.target;
    setState({
      ...state,
      [name]: value
    })
  } 

  const addHandler = async (e) => {
    e.preventDefault()
      await axios.post("http://localhost:4000/user/register", state)
      .then((res)=>{
        if(res.data=="Username already Registered"){
          console.log(res)
          alert(res.data)
        }else{
          navigate("/")
        }
      })
      .catch((err)=>{
        console.log(err)
        alert("Fields Empty or not filled Correctly")
      })
  }

  return (
    <div className="frm">
      <form className="register" method="POST" action="">
        <span className='frmhead'>Register</span>
        <label htmlFor="email">Username </label>
        <input
          type="email"
          name="username"
          placeholder="Enter a valid email"
          id="email"
          onChange={changeHandler}
        />
        <label htmlFor="pwd">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password of minimum length 6 "
          id="pwd"
          onChange={changeHandler}
        />


        <label htmlFor="fname">First Name</label>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          id="fname"
          onChange={changeHandler}
        />
        <label htmlFor="lname">Last Name</label>
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          id="lname"
          onChange={changeHandler}
        />

        <label htmlFor="gender">Gender</label>
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          id="gender"
          onChange={changeHandler}
        />
        <label htmlFor="dob">DOB</label>
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          id="dob"
          onChange={changeHandler}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          placeholder="Country"
          id="country"
          onChange={changeHandler}
        />

        
        <input
          type="button"
          value="Register"
          id="register"
          onClick={(e) => {addHandler(e);}}
        />
        <input
          type="button"
          value="Go to Login"
          id="login"
          onClick={() => navigate("/")}
        />
      </form>
    </div>
  );
}