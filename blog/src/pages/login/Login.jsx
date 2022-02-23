import { Link } from 'react-router-dom';
import './login.css'
import axios from 'axios';
import { useDispatch} from "react-redux";
import { useState} from 'react'
import { login } from "../../redux/apiCalls"


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, {username , password})
  }

    return (
        <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" >
        <label>Username</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." onChange={(e)=> setUsername(e.target.value)}/>
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..." onChange={(e)=> setPassword(e.target.value)}/>
        <button className="loginButton" type="submit" onClick={handleClick} >Login</button>
      </form>
        <button className="loginRegisterButton">
        <Link className="link" to="/register">
          register
        </Link></button>
    </div>
    )
}

export default Login;
