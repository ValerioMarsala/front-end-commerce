import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";

export const Dashboard = (props) => {
  return (
    <Wrapper>
      <Navbar
        numbOfCartItems={props.numbOfCartItems}
        setFilter={props.setFilter}
        loading={props.loading}
      />
      <Main>
        <Sidebar />
        <Outlet />
      </Main>
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  display: flex;
  padding: 20px;
  gap: 50px;
  min-height: 100vh;
`;
