// console.log("LOGIN CLICKED", email, password);
import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const login = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (data.message === "Login Success") {
        localStorage.setItem("token", data.token);
        navigate("/dashboard/laptops");
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
  <div className="login-wrapper">
    <div className="login-card">
      <h2 className="login-title">Welcome Back</h2>
      <p className="login-subtitle">Login to continue</p>

      <input
        type="email"
        ref={emailRef}
        placeholder="Enter Email"
        className="login-input"
      />

      <input
        type="password"
        ref={passwordRef}
        placeholder="Enter Password"
        className="login-input"
      />

      <button onClick={login} className="login-btn primary">
        Login
      </button>

      <button
        onClick={() => navigate("/register")}
        className="login-btn secondary"
      >
        New User? Register
      </button>

      <button
        onClick={() => navigate("/forgot-password")}
        className="login-btn warning"
      >
        Forgot Password?
      </button>
    </div>
  </div>
);

};

export default Login;
