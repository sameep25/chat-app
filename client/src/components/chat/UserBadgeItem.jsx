import { Box, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const BadgeBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  border-radius: 3px;
  margin: 2px;
  background: #2e3b49 !important;
  font-size: 0.7em;
  cursor: pointer;
`;

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <BadgeBox onClick={handleFunction}>
      {user.name}
      <CloseIcon sx={{ marginLeft: "2px" }} fontSize="inherit" />
    </BadgeBox>
  );
};

export default UserBadgeItem;
