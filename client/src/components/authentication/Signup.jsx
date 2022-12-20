import React from "react";
import { useState } from "react";

import { signupUserApi, uploadImageApi } from "../../service/userApi.js";
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
} from "@mui/material";
import Alert from "@mui/material/Alert";

// MUI Custom Components
const CustomFormControl = styled(FormControl)`
  margin: 1em;
  & > div {
    margin-top: 0px;
  }
`;

// default (dummy)user
const defaultUser = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  picture:
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
};

const Signup = () => {
  // handling user inputs
  const [userDetails, setUserDetails] = useState(defaultUser);
  const handleChanges = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    // console.log(userDetails);
  };

  // password utils
  const [show, setShow] = useState(false);
  const handleShowPassword = () => {
    setShow(!show);
  };

  //pic utils
  const [loading, setLoading] = useState(false);
  const [alertType, setAlertType] = useState("info");
  const [alertTitle, setAlertTitle] = useState("Upload an Image");
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setLoading(false);
  };

  // uploadind picture to cloudinary
  const picHandle = async (e) => {
    setLoading(true);
    const pic = e.target.files[0];

    if (pic === undefined) {
      setAlertType("info");
      setAlertTitle("No image is selected");
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-skoot");
      data.append("cloud_name", "sameepVishwakarma");

      let response = await uploadImageApi(data);
      if (response.status === 200) {
        setAlertType("success");
        setAlertTitle("Image uploaded successfully");
        await setUserDetails({ ...userDetails, picture: response.data.url });
      } else {
        setAlertType("error");
        setAlertTitle("Failed to upload image - Try Again ");
      }
    } else {
      setAlertType("warning");
      setAlertTitle("Please select an image file!");
    }
  };

  // calling signupUser api
  const signupUser = async () => {
    await signupUserApi(userDetails);
  };

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

          <Snackbar
            open={loading}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert severity={alertType} sx={{ width: "100%" }}>
              {alertTitle}
            </Alert>
          </Snackbar>
        </CustomFormControl>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <LoadingButton
            loading={loading}
            onClick={signupUser}
            sx={{ width: "90%", height: "60%" }}
            size="small"
            variant="contained"
          >
            Sign-up
          </LoadingButton>
        </Box>
      </FormGroup>
    </>
  );
};

export default Signup;
