import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const navigate = useNavigate();
const register = async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name: ref1.current.value,
        email: ref2.current.value,
        password: ref3.current.value,
      }
    );

    window.localStorage.setItem("token", data.token);
    navigate("/dashboard/laptops");

  } catch (err) {
    alert(err.response?.data?.message || "Registration Failed");
  }
};


  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

        <input type="text" ref={ref1} placeholder="Enter name" />
        <input type="email" ref={ref2} placeholder="Enter email" />
        <input type="password" ref={ref3} placeholder="Enter password" />

        <button onClick={register}>Register</button>
      </div>
    </div>
  );
};

export default Register;
