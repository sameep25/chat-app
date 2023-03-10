import { useState } from "react";
import { InputBase, styled, alpha, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import SideDrawer from "../sideDrawer/SideDrawer";

// MUI STYLED COMPONENTS
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
    },
  },
}));

const SearchBar = () => {

  //side-drawer utils
  const [openDrawer, setOpenDrawer] = useState(false);
  const [search, setSearch] = useState("");
  // console.log(search);

  return (
    <>
      <Tooltip title="Search users to chat" arrow>
        <Search onClick={() => setOpenDrawer(true)}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search User"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Search>
      </Tooltip>

      <SideDrawer
        open={openDrawer}
        close={() => setOpenDrawer(false)}
      />
    </>
  );
};

export default SearchBar;
