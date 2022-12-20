import React from "react";
import { useState } from "react";

import { signupUserApi } from "../../service/userApi.js";

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
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  picture: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
};

const Signup = () => {

  // handling user inputs
  const [userDetails, setUserDetails] = useState(defaultUser);
  const handleChanges = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    // console.log(userDetails);
  };
  const picHandle = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.files[0] });
  };
// utils
  const [show, setShow] = useState(false);
  const handleShowPassword = () => {
    setShow(!show);
  };

// calling signupUser api
  const signupUser = async () =>{
    await signupUserApi(userDetails) ;
  }

  return (
    <>
      <FormGroup sx={{ minWidth: "80%", margin: "auto" }}>
        <CustomFormControl required>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Enter your name"
            onChange={(e) => handleChanges(e)}
          />
        </CustomFormControl>

        <CustomFormControl required>
          <FormLabel>Email</FormLabel>
          <Input
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
              placeholder="Enter your password"
              onChange={(e) => handleChanges(e)}
            />
            <Button onClick={handleShowPassword} sx={{ float: "right" }}>
              {" "}
              {show ? "Hide" : "Show"}{" "}
            </Button>
          </Box>
        </CustomFormControl>

        <CustomFormControl required>
          <FormLabel>confirm-Password</FormLabel>
          <Box>
            <Input
              type={show ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-Enter your password"
              onChange={(e) => handleChanges(e)}
            />
            <Button onClick={handleShowPassword} sx={{ float: "right" }}>
              {show ? "Hide" : "Show"}
            </Button>
          </Box>
        </CustomFormControl>

        <CustomFormControl id="pic">
          <FormLabel>Upload your Picture (Optional) </FormLabel>
          <Input
            type="file"
            name="picture"
            accept="image/*"
            placeholder="Add your image"
            onChange={(e) => picHandle(e)}
          />
        </CustomFormControl>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={signupUser}
            sx={{ width: "90%", height: "60%" }}
            size="small"
            variant="contained"
          >
            Sign-up
          </Button>
        </Box>
      </FormGroup>
    </>
  );
};

export default Signup;
