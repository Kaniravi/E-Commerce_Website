import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { TrySharp } from "@mui/icons-material";
const initialState ={
  role:"",
  emailId:"",
  password:""
}
const Login = () =>{
  const navigate = useNavigate();
  const[user,setUser] = useState(initialState);
  const[showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () =>{
    setShowPassword(!showPassword);
  }

  const handleChange = (e) =>{
    const{name,value} = e.target;
    setUser({...user,[name]:value});
  } 

  const handleLogin = async(e) =>{
    e.preventDefault();
   
    let response;
    if(user.role ==="Admin" || user.role ==="admin"){
       try{
           response = await axios.get(`http://localhost:8080/admin/getAdmin/${user.emailId}`);
           const storedPassword = response.data.password;
           if(storedPassword === user.password){
              console.log("Logged successfully");
              const adminName = response.data.firstName;
              setUser(initialState);
              setShowPassword(false);
              navigate(`/adminPage/${adminName}`);
              
           }
       }
       catch(e){
        console.log("Error",e);
       }
    }
    if(user.role ==="Customer" || user.role ==="customer"){
      try{
        response = await axios.get(`http://localhost:8080/customer/getCustomer/${user.emailId}`);
        const storedPassword = response.data.password;
        if(storedPassword === user.password){
          console.log("Logged Successfully");
          const customerName = response.data.firstName;
          setUser(initialState);
          setShowPassword(false);
          navigate(`/customerPage/${customerName}`);
        }
      }
      catch(e){
        console.log("Error",e);
      }
    }
    if(user.role ==="Delivery Person" || user.role ==="delivery Person"){
      try{
        response = await axios.get(`http://localhost:8080/deliveryPerson/getDeliveryPerson/${user.emailId}`);
        const storedPassword = response.data.password;
        if(storedPassword === user.password){
          console.log("Logged Successfully");
          const deliveryPersonName = response.data.firstName;
          setUser(initialState);
          setShowPassword(false);
          navigate(`/deliveryPersonPage/${deliveryPersonName}`);
        }
      }
      catch(e){
        console.log("Error",e);
      }
    }

  }

  const handleHome = (e) =>{
   navigate(`/`);
  }
  return(
    <React.Fragment>
                <div className="navbar">
            <div className="image-Container">
              <img className="image" src="./image/1.jpg" width="50px" alt="Logo" />
            </div>
            <div className="navbar-1">
              <a href="#">Online Shopping</a>
              <a href="#">Contact Us</a>
              <a href="#">About Us</a>
            </div>
            <div className="navbar-2">
             <Link to="/userRegister">Register User</Link>
             <Link to="/userLogin">Login User</Link>
            </div>
          </div>
      <div className="registerForm">
        <h2 className="registerHeader">User Login</h2>
        <form className="form">
          <label htmlFor="role" className="registerLabel">User Role</label>
          <select id="role" name="role" value={user.role} onChange={handleChange} className="registerInput">
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Delivery Person">Delivery Person</option>
          </select>

          <label htmlFor="emailId" className="registerLabel">Email Id</label>
          <input
          type="text"
          id="emailId"
          name="emailId"
          value={user.emailId}
          onChange={handleChange}
          className="registerInput"
          >
          </input>

          <label htmlFor="password" className="registerLabel">Password</label>
          <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="registerInput"
          >
          </input>
          <div className="checkbox">
          <input type="checkbox"className="toggleBox" onChange={handleTogglePassword}></input>
          <h5 className="boxCheck">ShowPassword</h5>
          </div>
          <button className="buttonContainer">
          <button className="buttonRegister" onClick={handleLogin}>Login</button>
          <button className="buttonHome" onClick={handleHome}>Home</button>
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default Login;