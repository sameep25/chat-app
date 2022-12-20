import React from "react";
import { useState } from "react";
import { loginUserApi } from "../../service/userApi";

import {
  FormControl,
  Input,
  Box,
  FormGroup,
  FormLabel,
  styled,
  Button,
} from "@mui/material";

const CustomFormControl = styled(FormControl)`
  margin: 1em;
  & > div {
    margin-top: 0px;
  }
`;
const defaultUser = {
  // name: "",
  email: "",
  password: "",
};

const guestUser = {
  // name: "Guest",
  email: "guest@exapmle.com",
  password: "123456",
};

const Login = () => {
  const [userDetails, setUserDetails] = useState(defaultUser);
  const handleChanges = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);
  const handleShowPassword = () => {
    setShow(!show);
  };

  // handle guest user details
  const setGuestUser = () => {
    setUserDetails(guestUser);
    // console.log(defaultUser);
  };

  // hitting loginUserapi
  const loginUser = async() =>{
    await loginUserApi(userDetails) ;
  }

  return (
    <>
      <FormGroup sx={{ minWidth: "80%", margin: "auto" }}>
        {/* <CustomFormControl required>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={userDetails.name}
            placeholder="Enter your name"
            onChange={(e) => handleChanges(e)}
          />
        </CustomFormControl> */}

        <CustomFormControl required>
          <FormLabel>Email</FormLabel>
          <Input
            value={userDetails.email}
            name="email"
            placeholder="Enter your email"
            onChange={(e) => handleChanges(e)}
          />
        </CustomFormControl>

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

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={loginUser}
            sx={{ width: "90%", height: "60%" }}
            size="small"
            variant="contained"
          >
            Login
          </Button>
        </Box>

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
    </>
  );
};

export default Login;
