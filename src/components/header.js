import AccountCircle from "@mui/icons-material/AccountCircle";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  darkTheme,
  lightTheme,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "./extras";

export default function Header({ profile, logout, login, loginText }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [themeMode, setThemeMode] = useState(false);
  const isMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const bodyStyle = document.body.style;
    bodyStyle.backgroundColor = themeMode ? "grey" : "#eceff1";
    bodyStyle.color = "black";
  }, [themeMode]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>{profile}</MenuItem>
      <MenuItem onClick={login}>{loginText}</MenuItem>
      <MenuItem onClick={logout}>logout</MenuItem>
    </Menu>
  );

  return (
    <Box
      style={{
        flexGrow: 1,
        marginBottom: "2rem",
        zIndex: 1000,
        position: "fixed",
      }}
    >
      <ThemeProvider theme={themeMode ? darkTheme : lightTheme}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
                ROKO
              </Link>
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => setThemeMode(!themeMode)}
            >
              {themeMode ? <LightModeIcon /> : <NightlightRoundIcon />}
            </IconButton>
            <Box sx={{ display: "flex" }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      {renderMenu}
    </Box>
  );
}
