import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


const initialState ={
  role:"",
  firstName:"",
  lastName:"",
  emailId:"",
  password:"",
  mobileNo:"",
  street:"",
  city:"",
  pincode:""
}
const Register = () =>{
  const navigate = useNavigate();
  const[user,setUser] = useState(initialState);
  

  const handleChange = (e) =>{
    const {name,value} = e.target;
    setUser({...user,[name]:value});
  }

  const handleHome = () =>{
     navigate(`/`);
  }

  const handleRegister = async(e,role) =>{
    e.preventDefault();
      let response;
      if(role === "Admin" || role ==="admin"){
        try{
          response = await axios.post(`http://localhost:8080/admin/adminRegister`,user);
          console.log("Admin Registered Successfully");
          alert("Registered Successfully");
          
          console.log(response.data);
          setUser(initialState);
          navigate(`/`);
        }
        catch(e){
          console.log("Error",e);
        }
      }
      if(role ==="Customer" || role==="customer"){
        try{
          response = await axios.post(`http://localhost:8080/customer/customerRegister`,user);
          console.log("Customer registered Successfully");
          alert("Registered Successfully");
          console.log(response.data);
          setUser(initialState);
          navigate(`/`);
        }
        catch(e){
          console.log("Error",e);
        }
      }
      if(role ==="Delivery Person" || role ==="delivery person"){
        try{
            response = await axios.post(`http://localhost:8080/deliveryPerson/registerDeliveryPerson`,user);
            console.log("Customer registered Sucessfully");
            alert("Registered Successfully");
            console.log(response.data);
            setUser(initialState);
            navigate(`/`);
        }
        catch(e){
          console.log("Error ",e);
        }
      }
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
        <h2 className="registerHeader">Add User</h2>
        <form className="form">
          <label htmlFor="role" className="registerLabel">User Role</label>
          <select id="role" name="role" className="registerInput" value={user.role} onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
            <option value="Delivery Person">Delivery Person</option>
          </select>

          <label htmlFor="firstName" className="registerLabel">FirstName</label>
          <input
           type="text"
           id="firstName"
           name="firstName"
           className="registerInput"
           value={user.firstName}
           onChange={handleChange}
          >
          </input>

          <label htmlFor="lastName" className="registerLabel">LastName</label>
          <input
           type="text"
           id="lastName"
           name="lastName"
           className="registerInput"
           value={user.lastName}
           onChange={handleChange}
          >
          </input>

          <label htmlFor="emailId" className="registerLabel">Email Id</label>
          <input
           type="text"
           id="emailId"
           name="emailId"
           className="registerInput"
           value={user.emailId}
           onChange={handleChange}
          ></input>

          <label htmlFor="password" className="registerLabel">Password</label>
          <input
          type="password"
          id="password"
          name="password"
          className="registerInput"
          value={user.password}
          onChange={handleChange}
          >
          </input>

          <label htmlFor="mobileNo" className="registerLabel">Mobile No</label>
          <input
           type="text"
           id="mobileNo"
           name="mobileNo"
           className="registerInput"
           value={user.mobileNo}
           onChange={handleChange}
          >
          </input>

          <label htmlFor="street" className="registerLabel">Street</label>
          <textarea 
          id="street" 
          name="street" 
          className="registerInput"
          value={user.street}
          onChange={handleChange}
          ></textarea>

          <label htmlFor="city" className="registerLabel">City</label>
          <input 
          type="text" 
          id="city"
           name="city" 
           className="registerInput"
           value={user.city}
           onChange={handleChange}
           ></input>

          <label htmlFor="pincode" className="registerLabel">Pincode</label>
          <input 
          type="text" 
          id="pincode" 
          name="pincode"
           className="registerInput"
           value={user.pincode}
           onChange={handleChange}
           ></input>

          <button className="buttonContainer">
          <button className="buttonRegister" onClick={(e) =>{handleRegister(e, user.role)}}>Register User</button>
          <button className="buttonHome" onClick={handleHome}>Home</button>
          </button>



        </form>
      </div>
      
    </React.Fragment>
  )
}

export default Register;