import React from "react";
import Register from "../components/Register";
import Navbar from "../components/NavBar";

function LoginPage(props) {
  return (
    <>
      <Navbar numbOfCartItems={props.numbOfCartItems} />
      <Register />
    </>
  );
}

export default LoginPage;
