import React, { useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import search from "../../assets/images/search.png"
import facebook from "../../assets/images/facebook.png"
import github from "../../assets/images/github.png"
import linkedin from "../../assets/images/linkedin.png"
 
const RegisterAndLogin = () => {
  const [isActive, setIsActive] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  
  const navigate = useNavigate(); 

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/client/registerC`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, address, phoneNo, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUsername("");
        setEmail("");
        setPassword("");
        setPhoneNo("");
        setAddress("");
        console.log(data);
        alert("Vendor Registered Successfully");
      }
      console.log(response);
    } catch (error) {
      console.error("Registration Failed", error);
      alert("Registration Failed");
    }
  };



  const loginHandler = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_URL}/client/loginC`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      // Check if the response is not JSON
      // const contentType = response.headers.get("Content-Type");
      // if (!contentType || !contentType.includes("application/json")) {
      //   const text = await response.text();
      //   console.error("Unexpected response type:", text);
      //   // alert("Unexpected response from server.");
      //   return;
      // }
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Login success");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginTokenC", data.tokenC);
  
        const clientId = data.clientId;
        console.log("Checking for clientId:", clientId);
        
        const clientResponse = await fetch(`${API_URL}/client/single-Client/${clientId}`);
        const clientData = await clientResponse.json();
        if (clientResponse.ok) {
          const clientId = clientData.clientId;
          const clientName = clientData.client.username;
          const clientEmail = clientData.client.email;
           const clientPhoneNo = clientData.client.phoneNo;
          const clientAddress = clientData.client.address;
           
          // console.log("Checking for clientData:", clientData);
          localStorage.setItem("clientId", clientId);
          localStorage.setItem("clientName", clientName);
          localStorage.setItem("clientEmail", clientEmail);
           localStorage.setItem("clientPhoneNo", clientPhoneNo);
          localStorage.setItem("clientAddress", clientAddress);
          // console.log("Checking for clientId:", clientId);
          // console.log("Checking for clientName:", clientName);
          navigate('/landing');
        } else {
          console.error("Error fetching client data:", clientData);
          alert("Error fetching client data.");
        }
      } else {
        console.error("Login failed with status:", response.status);
        alert("Login failed.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed.");
    }
  };
  



  return (
    <>
      <div className="mainContainer">
        <div className={`containerRL ${isActive ? "activeRL" : ""}`}>
          <div className="formRL-containerRL sign-upRL">
            <form onSubmit={handleSubmit}>
              <h1>Create Account</h1>
              <div className="social-iconsRL">
                <a href="#" className="iconRL">
                 <img src={search}  alt="" />
                 {/* <i className="fa-brands fa-google-plus-g"></i> */}
                </a>
                <a href="#" className="iconRL">
                 <img src={facebook}  alt="" />
                  {/* <i className="fa-brands fa-facebook-f"></i> */}
                </a>
                <a href="#" className="iconRL">
                 <img src={github}  alt="" />
                  {/* <i className="fa-brands fa-github"></i> */}
                </a>
                <a href="#" className="iconRL">
                 <img src={linkedin}  alt="" />
                  {/* <i className="fa-brands fa-linkedin-in"></i> */}
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                required
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
              />
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <input
                required
                type="text"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Phone no"
              />
                <div className="addressBoxC">
                <input
                required
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
              <div className="addressEg">EG:-<span>No:2,Murali Street,Kadambathur,Thiruvallur</span></div>

                </div>
               {/* <input
                required
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
              <p className="addressEg">EG:-<span>No:2,Murali Street,Kadambathur,Thiruvallur</span></p> */}
               <button className="signInBtn">Sign Up</button>
            </form>
          </div>
          <div className="formRL-containerRL sign-inRL">
            <form onSubmit={loginHandler}>
              <h1>Sign In</h1>
              <div className="social-iconsRL">
                <a href="#" className="iconRL">
                 <img src={search}  alt="" />
                 {/* <i className="fa-brands fa-google-plus-g"></i> */}
                </a>
                <a href="#" className="iconRL">
                 <img src={facebook}  alt="" />
                  {/* <i className="fa-brands fa-facebook-f"></i> */}
                </a>
                <a href="#" className="iconRL">
                 <img src={github}  alt="" />
                  {/* <i className="fa-brands fa-github"></i> */}
                </a>
                <a href="#" className="iconRL">
                 <img src={linkedin}  alt="" />
                  {/* <i className="fa-brands fa-linkedin-in"></i> */}
                </a>
              </div>
              <span>or use your email for password</span>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <input
                required
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <a href="#" className="forgetPassword">Forget Your Password?</a>
              <button className="signInBtn">Sign In</button>
            </form>
          </div>
          <div className="toggleRL-containerRL">
            <div className="toggleRL">
              <div className="toggleRL-panelRL toggleRL-leftRL">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use
                   <br /> all of the site's features</p>
                <button type="button" className="hiddenRL" onClick={handleLoginClick}>
                  Sign In
                </button>
              </div>
              <div className="toggleRL-panelRL toggleRL-rightRL">
                <h1>Hello, Friend!</h1>
                <p>Register with your personal details to use
                  <br /> all of the site's features</p>
                <button type="button" className="hiddenRL" onClick={handleRegisterClick}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterAndLogin;
