import { Box } from "@mui/material";
import React from "react";
import LoginForm from "../Components/LoginForm";
import styled from "@emotion/styled";

const GeneratorPage = () => {
  const StyledBox = styled(Box)({
    height:'90vh',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });

  return (
    <StyledBox>
      <LoginForm />
    </StyledBox>
  );
};

export default GeneratorPage;
