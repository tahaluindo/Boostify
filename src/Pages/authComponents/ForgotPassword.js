import { useState } from "react";
import axios from "axios";
import auth from "./AuthComponents.module.css";
import Navbar from "../../Navbar/Navbar";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "https://secret-cove-64633.herokuapp.com/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className= {auth["forgotpassword-screen"]}>
        <form
          onSubmit={forgotPasswordHandler}
          className= {auth["forgotpassword-screen__form"]}
        >
          <h3 className= {auth["forgotpassword-screen__title"]}>Forgot Password</h3>
          {error && <span className= {auth["error-message"]}>{error}</span>}
          {success && <span className= {auth["success-message"]}>{success}</span>}
          <div className= {auth["form-group"]}>
            <p className= {auth["forgotpassword-screen__subtext"]}>
              Please enter the email address you registered your account with.
              We will send you reset password confirmation to this email
            </p>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className= {`${auth["form-btn"]} ${auth["form-btn-primary"]}`}>
            Send Email
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
