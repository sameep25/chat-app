import { useState } from "react";

import {
  Box,
  InputBase,
  alpha,
  Button,
  Drawer,
  styled,
  Typography,
} from "@mui/material";

const CustomDrawer = styled(Drawer)`
  & .MuiPaper-root {
    width: 40vh;
    background: #0a1929;
    color: white;
  }
`;
const Title = styled(Typography)`
  font-family: work sans;
  margin: 1em;
  border-bottom: 1px solid white;
`;
const Search = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  margin: "0 0 0 1em",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  minWidth: "70%",
}));
const StyledInputBase = styled(InputBase)`
  color: white;
  font-family: work sans;
  font-size:small ;
`;
const StyledButton = styled(Button)`
  background-color: #2e3b49;
  text-transform:none ;
  margin:0 1em 0 1px ;
  min-width:18% ;
  color:white ;
`;

const SideDrawer = (props) => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  return (
    <>
      {/* <Button onClick={toggleDrawer(true)}>as</Button> */}
      <CustomDrawer anchor={"left"} open={props.open} onClose={props.close}>
        <Title> Search Users </Title>
        <Box sx={{ display: "flex" }}>
          <Search>
            <StyledInputBase placeholder="Enter name or email" />
          </Search>
          <StyledButton  >Go</StyledButton>
        </Box>
      </CustomDrawer>
    </>
  );
};

export default SideDrawer;
