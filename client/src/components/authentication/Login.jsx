import React from "react";
import { useState, useContext } from "react";
import { loginUserApi } from "../../service/userApi";
import { useNavigate } from "react-router-dom";

import { ChatContext } from "../../context/ChatProvider";

import { LoadingButton } from "@mui/lab";
import {
  FormControl,
  Input,
  Box,
  FormGroup,
  FormLabel,
  styled,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

// MUI STYLED COMPONENTS
const CustomFormControl = styled(FormControl)`
  margin: 1em;
  & > div {
    margin-top: 0px;
  }
`;

// Login Default Inputs
const defaultUser = {
  email: "",
  password: "",
};
const guestUser = {
  email: "guest@example.com",
  password: "123456",
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const Login = () => {

  const navigate = useNavigate();
  const { setUser ,setToken } = useContext(ChatContext);

  const [userDetails, setUserDetails] = useState(defaultUser);

  //handling inputs
  const handleChanges = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  // handling password hide
  const [show, setShow] = useState(false);
  const handleShowPassword = () => {
    setShow(!show);
  };

  // handle guest user details
  const setGuestUser = () => {
    setUserDetails(guestUser);
  };

  // alert-utils
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertTitle, setAlertTitle] = useState("");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoading(false);
  };

  // hitting loginUserapi and storing data in context and local-storage
  const loginUser = async () => {
    setLoading(true);
    setAlertTitle("Logging in! Please Wait...")
    if (userDetails.email === "" || userDetails.password === "") {
      setAlertType("warning");
      setAlertTitle("Please fill all the fields");
      return;
    }

    try {
      const { data } = await loginUserApi(userDetails);
      // console.log("Login data : " ,data);
      setAlertTitle("Registration successfull !");
      setAlertType("success");

      localStorage.setItem("userInfo", JSON.stringify(data)); //storing user details in localStorage
      setUser(data.user);
      setToken(data.token) ;
      navigate("/chats");
    } catch (error) {
      setAlertTitle(error.response.data.message);
      setAlertType("error");
    }
  };

  return (
    <>
      <FormGroup sx={{ minWidth: "80%", margin: "auto" }}>
        {/* Email Input */}
        <CustomFormControl required>
          <FormLabel>Email</FormLabel>
          <Box>
            <Input
              fullWidth
              value={userDetails.email}
              name="email"
              placeholder="Enter your email"
              onChange={(e) => handleChanges(e)}
            />
          </Box>
        </CustomFormControl>

        {/* Password Input */}
        <CustomFormControl required>
          <FormLabel>Password</FormLabel>
          <Box>
            <Input
              type={show ? "text" : "password"}
              name="password"
              value={userDetails.password}
              placeholder="Enter your password"
              onChange={(e) => handleChanges(e)}
            />
            <Button onClick={handleShowPassword} sx={{ float: "right" }}>
              {" "}
              {show ? "Hide" : "Show"}{" "}
            </Button>
          </Box>
        </CustomFormControl>

        {/* login button container */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            loading={loading}
            onClick={loginUser}
            sx={{ width: "90%", height: "60%" }}
            size="small"
            variant="contained"
          >
            Login
          </LoadingButton>
        </Box>

        {/* set guest user button container */}
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "1em" }}
        >
          <Button
            sx={{ width: "90%", height: "60%" }}
            size="small"
            variant="contained"
            onClick={setGuestUser}
          >
            Get Guest User Credentials
          </Button>
        </Box>
      </FormGroup>

      {/* Alerts */}
      <Snackbar open={loading} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity={alertType} sx={{ width: "100%" }}>
          {alertTitle}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Login;
