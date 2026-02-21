import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    const password = passwordRef.current.value;
    const confirmPassword = confirmRef.current.value;

    if (!password || !confirmPassword) {
      setMessage("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const { data } = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      setMessage(data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid or expired token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Reset Your Password</h2>
        <p className="subtitle">
          Enter a new password below to regain access
        </p>

        <input
          type="password"
          ref={passwordRef}
          placeholder="New Password"
        />

        <input
          type="password"
          ref={confirmRef}
          placeholder="Confirm Password"
        />

        <button onClick={handleResetPassword} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
