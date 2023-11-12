import React from 'react'
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import VerificationForm from '../Components/VerificationForm';


const VerificationPage = () => {

  const StyledBox = styled(Box)({
    height:'90vh',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  return (
    <StyledBox>
      <VerificationForm/>
    </StyledBox>
  )
}

export default VerificationPage
