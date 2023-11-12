import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import { AssignmentInd } from "@mui/icons-material";

const VerificationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(AppContext);

  const [otpInput, setOtpInput] = useState({
    otpOne: "",
    otpTwo: "",
    otpThree: "",
    otpFour: "",
    otpFive: "",
    otpSix: "",
  });

  const [isClicked, setIsClicked] = useState(false);
  const [timer, setTimer] = useState(90);

  const StyledTypography = styled(Typography)({
    color: "white",
    marginBottom: "30px",
  });

  const StyledBox = styled(Box)({
    backgroundColor: "#27272a",
    width: "80%",
    maxWidth: "550px",
    margin: "0 auto",
    textAlign: "center",
    padding: "30px",
    borderRadius: "10px",
  });

  const StyledTextField = styled(TextField)({
    width: "2.5rem",
    overflow: "hidden",
  });

  const inputTextStyle = {
    width: "100%",
    color: "white",
    textAlign: "center",
  };

  const getOtp =
    otpInput.otpOne +
    otpInput.otpTwo +
    otpInput.otpThree +
    otpInput.otpFour +
    otpInput.otpFive +
    otpInput.otpSix;

  const handleVerify = async () => {
    try {
      const response = await fetch(
        "https://otp-service-beta.vercel.app/api/otp/verify",
        {
          method: "POST",
          body: JSON.stringify({
            email: location.state.email,
            otp: getOtp,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.message) {
        dispatch({ type: "SET_LOADING", payload: false });
        toast.success(result.message);
        navigate("/success");
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
        toast.error(`${result.error}, Please try again!`);
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      toast.error(`${error}, Please try after some time!`);
    }
  };

  const handleChange = (event) => {
    return setOtpInput((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const checkCondition = (data) => {
    if (
      data.otpOne.length &&
      data.otpTwo.length &&
      data.otpThree.length &&
      data.otpFour.length &&
      data.otpFive.length &&
      data.otpSix.length
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSend = async () => {
    try {
      const response = await fetch(
        "https://otp-service-beta.vercel.app/api/otp/generate",
        {
          method: "POST",
          body: JSON.stringify(location.state),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.message) {
        dispatch({ type: "SET_LOADING", payload: false });
        toast.success(result.message);
        navigate("/verify", {
          state: location.state,
        });
      } else {
        dispatch({ type: "SET_LOADING", payload: false });
        toast.error(`${result.error}, Please try after some time!`);
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      toast.error(`${error}, Please try after some time!`);
    }
  };

  useEffect(() => {
    if (timer <= 0) return;

    const timerInterval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer]);

  return (
    <StyledBox>
      <AssignmentInd
        sx={{
          color: "white",
          fontSize: { xs: "60px", md: "80px" },
          marginBottom: "20px",
        }}
      />
      <StyledTypography variant="h4">Verification Code</StyledTypography>
      <StyledTypography sx={{ fontSize: { xs: "12px", md: "14px" } }}>
        One Time Password (OTP) has been sent via Email to{" "}
        {location.state.email}!
      </StyledTypography>
      <Typography sx={{ color: "white" }}>
        Enter the OTP below to verify it
      </Typography>{" "}
      {checkCondition(otpInput) === false && isClicked ? (
        <Typography sx={{ color: "red", marginTop: "10px", fontSize: "12px" }}>
          Please Fill all the fields*
        </Typography>
      ) : (
        ""
      )}
      <Box position="relative">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          <StyledTextField
            id="otpOne"
            name="otpOne"
            autoFocus={!checkCondition(otpInput)}
            value={otpInput.otpOne}
            required
            placeholder="*"
            onChange={handleChange}
            inputProps={{
              maxLength: 1,
              style: inputTextStyle,
            }}
          />
          <StyledTextField
            id="otpTwo"
            name="otpTwo"
            autoFocus={
              otpInput.otpOne.length && !otpInput.otpThree.length ? true : false
            }
            value={otpInput.otpTwo}
            required
            placeholder="*"
            onChange={handleChange}
            inputProps={{
              maxLength: 1,
              style: inputTextStyle,
            }}
          />
          <StyledTextField
            id="otpThree"
            name="otpThree"
            autoFocus={
              otpInput.otpTwo.length && !otpInput.otpFour.length ? true : false
            }
            value={otpInput.otpThree}
            required
            placeholder="*"
            onChange={handleChange}
            inputProps={{
              maxLength: 1,
              style: inputTextStyle,
            }}
          />
          <StyledTextField
            id="otpFour"
            name="otpFour"
            autoFocus={
              otpInput.otpThree.length && !otpInput.otpFour.length
                ? true
                : false
            }
            value={otpInput.otpFour}
            required
            placeholder="*"
            onChange={handleChange}
            inputProps={{
              maxLength: 1,
              style: inputTextStyle,
            }}
          />
          <StyledTextField
            id="otpFive"
            name="otpFive"
            autoFocus={
              otpInput.otpFour.length && !otpInput.otpSix.length ? true : false
            }
            value={otpInput.otpFive}
            required
            placeholder="*"
            onChange={handleChange}
            inputProps={{
              maxLength: 1,
              style: inputTextStyle,
            }}
          />
          <StyledTextField
            id="otpSix"
            name="otpSix"
            value={otpInput.otpSix}
            autoFocus={
              otpInput.otpFive.length && checkCondition(otpInput) === false
                ? true
                : false
            }
            required
            placeholder="*"
            onChange={handleChange}
            inputProps={{
              maxLength: 1,
              style: inputTextStyle,
            }}
          />
        </Box>
        <Button
          sx={{
            position: "absolute",
            right: 0,
            bottom: "-100%",
            color: "#ff1744",
          }}
          onClick={() => {
            setIsClicked(false);
            setOtpInput({
              otpOne: "",
              otpTwo: "",
              otpThree: "",
              otpFour: "",
              otpFive: "",
              otpSix: "",
            });
          }}
        >
          Clear
        </Button>
      </Box>
      {timer > 0 ? (
        <Typography
          sx={{ color: "#76ff03", marginTop: "10px", fontSize: "12px" }}
        >
          Didn't get OTP? Resend in {timer} seconds!
        </Typography>
      ) : (
        <Typography
          sx={{
            color: "#ffea00",
            marginTop: "10px",
            fontSize: "12px",
            cursor: "pointer",
          }}
          onClick={() => {
            dispatch({ type: "SET_LOADING", payload: true });
            handleSend();
          }}
        >
          Resend OTP
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "60px", padding: "15px", width: "100%" }}
        onClick={() => {
          setIsClicked(true);
          if (checkCondition(otpInput) === true) {
            dispatch({ type: "SET_LOADING", payload: true });
            handleVerify();
          }
        }}
      >
        Verify OTP
      </Button>
    </StyledBox>
  );
};

export default VerificationForm;
