import React, { useEffect, useRef, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(username, password)
      .then((response) => {
        console.log(response.cookie);
        //document.cookie = "token=" + response.cookie.value;
        navigate("/");
      })
      .catch((error) => {
        setErrMsg(error.response.status);
        if (!error?.response) {
          alert("No server response");
        } else if (error.response?.status === 400) {
          alert("Username or Password mancante");
        } else if (error.response?.status === 401) {
          alert("Username o password errati");
        } else {
          alert("Login fallito");
        }
      });
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <div className="login-wrapper">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Accedi</h1>
      <form onSubmit={handleLogin}>
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
        <button>Login</button>
        <p>
          <a href="/signup">Registrati</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
