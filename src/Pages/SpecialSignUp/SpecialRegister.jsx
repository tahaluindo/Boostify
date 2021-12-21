import React, { useState } from "react";
import axios from "axios";
 import auth from "../authComponents/AuthComponents.module.css";
 import "./CSS/Redirect.css"

const SpecialRegister = ({ history, display }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const special = true;
 
  let dateFormated = new Date().getTime() + (86400000 * 2);
  let dateCreated = new Date(dateFormated).toLocaleDateString("en-UK", options);
  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "https://secret-cove-64633.herokuapp.com/api/auth/register",
        { username, email, password, special, dateCreated },
        config
      );
      localStorage.setItem("authToken", data.token);
      history.push("/thank_you" + window.location.search);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className={auth["register-screen"]} style={{ display: display }}>
      <form
        onSubmit={registerHandler}
        className={`${auth["register-screen__form"]}  ${auth["animation"]}`}
      >
        <h3
          className={`${auth["register-screen__title"]} ${auth["text-shadow-black"]}`}
          style={{ color: "black" }}
        >
          Register Today <br /> For A Free 4k/20 Bomb With Your Next Rank Boost
          Order
        </h3>
        {error && <span className={auth["error-message"]}>{error}</span>}
        <div className={auth["form-group"]}>
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={auth["form-group"]}>
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
        <div className={auth["form-group"]}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={auth["form-group"]}>
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={`${auth["form-btn"]} ${auth["form-btn-primary"]}`}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SpecialRegister;
