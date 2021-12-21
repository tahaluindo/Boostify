import { useState } from "react";
import axios from "axios";

import auth from "./AuthComponents.module.css";

const ResetPassword = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `https://secret-cove-64633.herokuapp.com/api/auth/passwordreset/${match.params.resetToken}`,
        {
          password,
        },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className={auth["resetpassword-screen"]}>
      <form
        onSubmit={resetPasswordHandler}
        className={auth["resetpassword-screen__form"]}>
        <h3 className={auth["resetpassword-screen__title"]}>Forgot Password</h3>
        {error && <span className={auth["error-message"]}>{error} </span>}
        {success && (
          <span className={auth["success-message"]}>
            {success} <a href="https://www.boostify.es">Login</a>
          </span>
        )}
        <div className={auth["form-group"]}>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={auth["form-group"]}>
          <label htmlFor="confirmpassword">Confirm New Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={`${auth["form-btn"]} ${auth["form-btn-primary"]}`}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
