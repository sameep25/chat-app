import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography, styled, Button } from "@mui/material";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";

const CustomBox = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 10px;
  background: white;
  width: 100%;
  border-radius: 5px;
  margin: 10px 0 12px 0;
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
`;
const CustomButton = styled(Button)`
  width: 100%;
  color: #202124;
  font-family: work sans;
  text-transform: none;
`;
const Container = styled(Box)`
  display: flex;
  padding: 10px;
  background: white;
  width: 100%;
  margin: 40px 0 12px 0;
  border-radius: 5px;
`;

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // parse since data in stringify format

    if (userInfo) {
      navigate("/chats");
    }
  }, []);

  const [loginTab, setLoginTab] = useState(true);
  const handleLoginTab = (e) => {
    if (e.target.name === "login") setLoginTab(true);
    else setLoginTab(false);
  };

  return (
    <Grid justifyContent={"center"} container spacing={2}>
      <Grid item lg={6} sm={10} xs={10}>
        <CustomBox>
          <TitleText>Chat-Skoot</TitleText>
        </CustomBox>

        <CustomBox sx={{ marginBottom: "1px" }}>
          <LoginBox sx={{ ":hover": { background: "#8cc6ff" } }}>
            <CustomButton
              name="login"
              onClick={(e) => handleLoginTab(e)}
              variant="text"
            >
              Login{" "}
            </CustomButton>
          </LoginBox>

          <LoginBox sx={{ ":hover": { background: "#8cc6ff" } }}>
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
