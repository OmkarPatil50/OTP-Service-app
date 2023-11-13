import { VpnKey } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import React from "react";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#27272a" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton sx={{ display: "flex" }} color="inherit">
            <VpnKey />
          </IconButton>
          <Typography
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "1.2rem",
            }}
          >
            OTP SERVICE
          </Typography>
          <Button
            key="login"
            sx={{ my: 2, color: "white", display: "block" }}
            href="/"
          >
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
