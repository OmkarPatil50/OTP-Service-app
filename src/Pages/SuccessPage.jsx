import { Box, Typography, Button } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import { Verified, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const StyledBox = styled(Box)({
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  });
  const StyledTypography = styled(Typography)({
    color: "white",
    margin: "20px",
  });

  const StyledButton = styled(Button)({
    margin: "40px 0 20px 0 ",
    padding: "10px 20px",
  });
  return (
    <StyledBox>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding:'25px' }}
      >
        <Verified sx={{ color: "#76ff03", fontSize: {xs:'64px' , md:'124px'} }} />
        <StyledTypography variant="h4">
          User Verified Successfully...!
        </StyledTypography>
      </Box>
      <StyledButton
        variant="contained"
        endIcon={<Home />}
        onClick={() => {
          navigate("/");
        }}
      >
        Return to Home Page
      </StyledButton>
    </StyledBox>
  );
};

export default SuccessPage;
