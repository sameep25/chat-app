import React from "react";

import SearchBar from "../miscellaneous/SearchBar";
import UserMenu from "../miscellaneous/UserMenu";

import { Box, AppBar, Toolbar, styled, Typography } from "@mui/material";

const TitleText = styled(Typography)`
  font-size: x-large;
  font-family: work sans;
  display: flex;
  justify-content: center;
  margin-right: 2em;
`;

const Navbar = () => {
  return (
    <Box sx={{marginBottom : "0.5em" }} >
      <AppBar sx={{ background: "#0a1929" }} position="static">
        <Toolbar>
          <SearchBar />
          <TitleText sx={{ flexGrow: 1, display: { xs: "none", sm: "flex" } }}>
            Chat-Skoot
          </TitleText>
          <UserMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
