import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

export function Button(props) {
  return (
    <Link to={"/login"+ window.location.search} style={{ textDecoration: "none" }}>
      <button className="btnNAV" style={{ display: props.display }}>
        Log in
      </button>
    </Link>
  );
}
