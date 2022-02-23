import axios from 'axios';
import React, { useState } from 'react'
import { axiosInstance } from '../../config';
import './register.css'

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("")

  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError(false)
    try {
      const res = await axiosInstance.post("/user/register",{
        username,
        password,
        email
      });
      res.data && window.location.replace("/login")
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }


    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={e=>setUsername(e.target.value)}/>
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." onChange={e=>setEmail(e.target.value)}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..." onChange={e=>setPassword(e.target.value)}/>
        <button className="registerButton">Register</button>
      </form>
        <button className="registerLoginButton">Login</button>
        {error && <p>something went wrong</p>}
    </div>
    )
}

export default Register;
