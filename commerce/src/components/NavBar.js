import React, { useEffect, useState } from "react";
import { FaBars, FaFacebookF, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
//import AuthContext from "../context/AuthContext";
import AuthService from "../services/auth.service";
import CartIcon from "./CartIcon";

function Navbar(props) {
  const [userLogged, setUserLogged] = useState("");

  const handleLogout = () => {
    AuthService.logout();
  };

  useEffect(() => {
    setUserLogged(AuthService.getCurrentUser());
  }, [userLogged]);

  return (
    <Nav>
      <FaFacebookF color="white" size="1.8em" />
      <NavLink to="/"> Home </NavLink>
      <NavLink to="/dashboard"> Dashboard </NavLink>
      <NavSearch
        id="search"
        type="search"
        onChange={(e) => props.setFilter(e.target.value)}
        placeholder="Ricerca prodotto"
      ></NavSearch>
      <NavFaSearch color="white" size="1.8em" />
      {userLogged ? (
        <NavLink to="" onClick={handleLogout}>
          Logout <br />
          <span style={{ color: "red" }}>{userLogged}</span>
        </NavLink>
      ) : (
        <NavLink to="/login">Login </NavLink>
      )}
      <NavCart to="/cart">
        <CartIcon numbOfCartItems={props.numbOfCartItems} />
      </NavCart>
      <NavHambBars />
    </Nav>
  );
}

export default Navbar;

const Nav = styled.nav`
  background: black;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  color: azure;
  margin: 0 20px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: #fac136;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavSearch = styled.input`
  height: 50%;
  flex: 1;
  margin: 0 20px;
  padding: 10px;
  font-size: 1.2em;

  &::-webkit-search-cancel-button:hover {
    cursor: pointer;
  }
`;

const NavCart = styled(Link)`
  margin: 0 20px;
  text-decoration: none;
`;
const NavFaSearch = styled(FaSearch)`
  margin: 0 20px;
`;

const NavHambBars = styled(FaBars)`
  color: white;
  font-size: 1.5em;
  margin: 0 20px;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
