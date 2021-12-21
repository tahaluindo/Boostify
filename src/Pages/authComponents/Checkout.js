import { useState, useEffect } from "react";
import axios from "axios";
import auth from "./AuthComponents.module.css";
import Navbar from "../../Navbar/Navbar";
const Checkout = ({ history }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/" + window.location.search);
    }
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        await axios.get(
          "https://secret-cove-64633.herokuapp.com/api/private",
          config
        );
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("Please LogIn to checkout");
      }
    };

    fetchPrivateData();
  }, [history]);

  return error ? (
    <>
      <Navbar></Navbar>
      <span className={auth["error-message"]}>{error}</span>
    </>
  ) : (
    <>
      <Navbar></Navbar>
    </>
  );
};

export default Checkout;
