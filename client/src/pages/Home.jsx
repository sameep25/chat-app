import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography, styled, Button } from "@mui/material";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";

// MUI STYLED COMPONENTS
const CustomBox = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 0.5em;
  background: white;
  border-radius: 5px;
  margin: 1em 0 1em 0;
`;
const TitleText = styled(Typography)`
  font-size: xx-large;
  font-family: work sans;
`;
const LoginBox = styled(Box)`
  display: flex;
  min-width: 50%;
  justify-content: center;
  border-radius: 40px;
  :hover {
    cursor: pointer;
    background: #8cc6ff;
  }
`;
const CustomButton = styled(Button)`
  width: 100%;
  color: #202124;
  font-family: work sans;
  text-transform: none;
`;
const Container = styled(Box)`
  display: flex;
  padding: 0.5em;
  background: white;
  border-radius: 5px;
`;

const Home = () => {
  const navigate = useNavigate();

  // getting userInfo from local storage
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // parse since data in stringify format

    if (userInfo) {
      navigate("/chats");
    }
  }, []);

  //  login and signup tab
  const [loginTab, setLoginTab] = useState(true);
  const handleLoginTab = (e) => {
    if (e.target.name === "login") setLoginTab(true);
    else setLoginTab(false);
  };

  return (
    <Grid justifyContent={"center"} container>
      <Grid item lg={6} md={7} sm={8} xs={10}>
        <CustomBox>
          <TitleText>Chat-Skoot</TitleText>
        </CustomBox>

        {/* login and signup */}
        <CustomBox sx={{ marginBottom: "1px" }}>
          {/* login tab */}
          <LoginBox bgcolor={loginTab ? "#8cc6ff" : "white"}>
            <CustomButton
              name="login"
              onClick={(e) => handleLoginTab(e)}
              variant="text"
            >
              Login{" "}
            </CustomButton>
          </LoginBox>

          {/* signup tab */}
          <LoginBox bgcolor={!loginTab ? "#8cc6ff" : "white"}>
            <CustomButton
              name="signup"
              onClick={(e) => handleLoginTab(e)}
              variant="text"
            >
              Sign Up
            </CustomButton>
          </LoginBox>
        </CustomBox>

        <Container sx={{ marginTop: "0px" }}>
          {loginTab ? <Login /> : <Signup />}
        </Container>
      </Grid>
    </Grid>
  );
};

export default Home;
