import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { Send } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";

const StyledFormControl = styled(FormControl)({
  width: "100%",
  marginTop: "30px",
});

const StyledInputLabel = styled(InputLabel)({
  color: "#ccc",
  alignSelf: "center",
});

const StyledButton = styled(Button)({
  margin: "40px 0 20px 0 ",
  padding: "10px 20px",
  width: "100%",
});

const StyledInput = styled(Input)({
  color: "white",
  padding: "0 15px",
  fontSize: "18px",
});

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    type: "",
    organization: "",
    subject: "OTP Verification",
  });

  const [isClicked, setIsClicked] = useState(false);

  const { dispatch } = useContext(AppContext);

  const changeHandler = (event) => {
    return setFormData((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const checkEmail = (email) => {
    return email.includes(".") && email.includes("@");
  };

  const handleSend = async () => {
    try {
      const response = await fetch(
        "https://otp-service-beta.vercel.app/api/otp/generate",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.message) {
        dispatch({ type: "SET_LOADING", payload: false });
        toast.success(result.message);
        navigate("/verify", {
          state: formData,
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

  const StyledFormHelperText = styled(FormHelperText)({
    color: "red",
  });

  return (
    <Box width={480} sx={{ padding: "25px" }}>
      <Typography
        variant="h4"
        textAlign="center"
        sx={{ color: "white", marginBottom: "10px" }}
      >
        Login
      </Typography>

      <StyledFormControl>
        <StyledInputLabel htmlFor="email">Email address</StyledInputLabel>
        <StyledInput
          id="email"
          name="email"
          type="email"
          required
          onChange={changeHandler}
          aria-describedby="my-helper-text"
        />
        {isClicked && !formData.email.length ? (
          <StyledFormHelperText id="my-helper-text">
            Email is Required*
          </StyledFormHelperText>
        ) : isClicked &&
          formData.email.length &&
          !checkEmail(formData.email) ? (
          <StyledFormHelperText id="my-helper-text">
            Please Enter Valid Email*
          </StyledFormHelperText>
        ) : (
          ""
        )}
      </StyledFormControl>
      <StyledFormControl>
        <StyledInputLabel htmlFor="organization">
          Name of Organization
        </StyledInputLabel>
        <StyledInput
          id="organization"
          name="organization"
          required
          onChange={changeHandler}
          aria-describedby="my-helper-text"
        />
        {isClicked && !formData.organization.length ? (
          <StyledFormHelperText id="my-helper-text">
            Organization Name is Required*
          </StyledFormHelperText>
        ) : (
          ""
        )}
      </StyledFormControl>

      <StyledFormControl variant="standard" sx={{ minWidth: 120 }}>
        <StyledInputLabel
          id="demo-simple-select-standard-label"
          sx={{ padding: "0 10px" }}
        >
          OTP Type
        </StyledInputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="OTP type"
          name="type"
          onChange={changeHandler}
          sx={{ color: "white", padding: "0 15px" }}
        >
          <MenuItem value="">
            <em>Select OTP Type</em>
          </MenuItem>
          <MenuItem value="numeric">Numeric</MenuItem>
          <MenuItem value="alphanumeric">Alphanumeric</MenuItem>
          <MenuItem value="alphabet-based">Alphabet-Based</MenuItem>
        </Select>
        {isClicked && !formData.type.length ? (
          <StyledFormHelperText id="my-helper-text" sx={{ marginLeft: "15px" }}>
            OTP Type is Required*
          </StyledFormHelperText>
        ) : (
          ""
        )}
      </StyledFormControl>
      <StyledButton
        variant="contained"
        endIcon={<Send />}
        onClick={() => {
          setIsClicked(true);
          if (
            formData.email.length &&
            formData.type.length &&
            formData.organization.length &&
            checkEmail(formData.email)
          ) {
            dispatch({ type: "SET_LOADING", payload: true });
            handleSend();
          }
        }}
      >
        Send OTP
      </StyledButton>
    </Box>
  );
};

export default LoginForm;
