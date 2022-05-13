import React, { useEffect, useRef, useState } from "react";

import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleRegistration = (e) => {
    e.preventDefault();

    AuthService.register(username, email, password)
      .then((response) => {
        console.log(response);
        //document.cookie = "token=" + response.cookie.value;
        navigate("/");
      })
      .catch((error) => {
        setErrMsg(error.response.status);
        if (!error?.response) {
          alert("No server response");
        } else if (error.response?.status === 401) {
          alert("Non sei autorizzato");
        } else if (
          error.response?.data.cause.constraintName === "user.username_UNIQUE"
        ) {
          alert("Username già in uso");
        } else if (
          error.response?.data.cause.constraintName === "user.email_UNIQUE"
        ) {
          alert("Email già in uso");
        } else {
          alert("Registrazione fallita");
        }
      });
  };

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <div className="login-wrapper">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Registrati</h1>
      <form onSubmit={handleRegistration}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button>Sign up</button>
      </form>
    </div>
  );
}

export default Register;
