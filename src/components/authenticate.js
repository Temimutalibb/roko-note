import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Fab, FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";
import { server } from "../App";
import AuthenticateUser from "./authenticateuser";

export function UserForm({ formDisplay }) {
  const [email, setEmail] = useState("");
  const [authenticateUser, setAuthenticateUser] = useState(false);
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("signup/login");
  const handleEmailchange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChamge = (event) => {
    setPassword(event.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setMessage("submiting...");
    setSubmitting(true);
    axios
      .post(`${server}signup`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        setMessage(data.message);
        setSubmitting(false);
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);
        }
        setMessage("something went wrong ");
        setSubmitting(false);
        console.error("There was an error", error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("submiting...");
    setSubmitting(true);
    axios
      .post(`${server}login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        setMessage(data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.email);
        setSubmitting(false);
        setAuthenticateUser(true);
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.message);
        }

        setMessage("something went wrong ");
        setSubmitting(false);
        console.error("There was an error", error);
      });
  };

  if (authenticateUser) {
    return <AuthenticateUser />;
  }

  return (
    <fragment>
      <FormControl>
        <Box
          style={{
            padding: "2rem",
            margin: "2rem",
            boxShadow: "1px 1px 2px 1px ",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Fab
            size="small"
            onClick={formDisplay}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            <CloseIcon />
          </Fab>

          <Typography
            style={{
              textAlign: "center",
              marginTop: "2rem",
              color: "GrayText",
            }}
            variant="h6"
            gutterBottom
          >
            {message}
          </Typography>

          <TextField
            onChange={handleEmailchange}
            value={email}
            name="email"
            required
            id="outlined-email-input"
            label="Email"
            type="email"
            variant="filled"
            style={{ margin: "0.5rem", marginTop: "1rem" }}
          />
          <TextField
            onChange={handlePasswordChamge}
            value={password}
            name="password"
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            variant="filled"
            style={{ margin: "0.5rem" }}
          />
          {submitting ? (
            <LoadingButton
              style={{ margin: "0.5rem" }}
              loading
              variant="contained"
            >
              Submit
            </LoadingButton>
          ) : (
            " "
          )}

          {!submitting ? (
            <>
              <Button
                onClick={handleSignup}
                variant="outlined"
                size="large"
                style={{ margin: "0.5rem" }}
              >
                Signup
              </Button>
              <Button
                onClick={handleLogin}
                variant="outlined"
                size="large"
                style={{ margin: "0.5rem" }}
              >
                Login
              </Button>
            </>
          ) : (
            ""
          )}
        </Box>
      </FormControl>
    </fragment>
  );
}
