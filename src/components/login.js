import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import "./login.css";
const Login = () => {
  const { setNamee, role, setRole } = useContext(userContext); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rolee, setRolee] = useState("student");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (rolee === "student") {
      setRole("student");
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        await setNamee(data.username); 
        console.log("Token : ", data.token);
        console.log("Username : ", data.username);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", "student");

        await navigate("/");
      } else {
        alert("Login failed");
      }
    } else {
      setRole("admin");
      const response = await fetch("http://localhost:8000/loginadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        await setNamee(data.username); 
        console.log("Token : ", data.token);
        console.log("Username : ", data.username);
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", "admin");

        await navigate("/admin");
      } else {
        alert("Login failed");
      }
    }
  };

  return (
    <div className="login-container">
   <h2>Login</h2>
   <form className="login-form" onSubmit={handleLogin}>
     <div className="input-group">
       <label>Username: </label>
       <input
         type="text"
         value={username}
         onChange={(e) => setUsername(e.target.value)}
         required
       />
     </div>
     <div className="input-group">
       <label>Password: </label>
       <input
         type="password"
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         required
       />
     </div>
     <div className="input-group">
       <label>Role: </label>
       <select value={rolee} onChange={(e) => setRolee(e.target.value)}>
         <option value="student">Student</option>
         <option value="admin">Admin</option>
       </select>
     </div>
     <div className="button-container">
       <button className="login-button" type="submit">Login</button>
       <button className="signup-button" onClick={() => navigate("/signup")}>Sign Up</button>
     </div>
   </form>
</div>

  );
};

export default Login;
