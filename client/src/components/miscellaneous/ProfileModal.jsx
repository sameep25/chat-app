import { useState } from "react";
import { Box, Button, Typography, Modal, styled } from "@mui/material";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45vh",
  height: "40vh",
  borderRadius: "5px",
  bgcolor: "background.paper",
  boxShadow: 18,
  p: 2,
};

const CustomImage = styled("img")({
  width: "45%",
  height: "45%",
  borderRadius: "100%",
  marginTop: "1em",
  marginBottom: "1.5em",
});

const ProfileModal = (props) => {
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            sx={{ fontFamily: "work sans", fontWeight: "600" }}
          >
            {props.user.name}
          </Typography>

          <CustomImage alt={props.user.name} src={props.user.picture} />

          <Typography sx={{ fontFamily: "work sans" }}>
            {props.user.email}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ProfileModal;
