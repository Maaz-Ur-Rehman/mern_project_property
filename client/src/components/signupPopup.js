import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from "./NavBar";
import "./SignupForm.css";
import {signup} from './../services/api.js'

const SignupForm = () => {
  const [Name, setName] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    // Handle signup logic here
    const userData = { Name, CompanyName, email, password };
    try{
      const response = await signup(userData);
      if (response.status === 201) {
        // Successful signup
        // alert("Signup Successful!");
        navigate('/login');
    }
    }
    catch(error){
      alert(" Incorrect credentials!");
    }

  };

  return (
    <div>
        <Navbar/>
    <div className="signup-form-container" style={{marginTop : '115px'}}>
      <form onSubmit={handleSignup}>
        <h2>Sign Up for Real Estate Updates</h2>
        <div className="input-container">
          <label htmlFor="Name">Name</label>
          <input
            id="Name"
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="CompanyName">Company Name</label>
          <input
            id="CompanyName"
            type="text"
            value={CompanyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign up</button>
      </form>
      <Link to="/login" className="nav-link">Already have Account</Link>
    </div>
    </div>
  );
};

export default SignupForm; 