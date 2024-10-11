import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserForm } from "./authenticate";

export default function Home() {
  const [formDisplay, setFormDisplay] = useState(false);
  return (
    <>
      <div
        style={{
          padding: "2rem",
          borderRadius: 2,
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          margin: "auto",
          width: "20rem",
          justifyContent: "center" /* Center horizontally */,
          alignItems: "center" /* Center vertically */,
          marginTop: "2rem",
          height: "auto",
          maxHeight: "30rem",
          marginBottom: "2rem",
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            margin: "auto",
            marginTop: "2rem",
            width: "20rem",
            justifyContent: "center" /* Center horizontally */,
            alignItems: "center" /* Center vertically */,
            overflowY: "hidden",
          }}
        >
          <Item>signin with google</Item>
          <Item>sign in with facebook</Item>
          <Item>signin with github</Item>
          <Item onClick={() => setFormDisplay(!formDisplay)}>
            {" "}
            continue with email
          </Item>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Item> continue as guess</Item>
          </Link>
        </Box>

        {formDisplay && (
          <UserForm formDisplay={() => setFormDisplay(!formDisplay)} />
        )}
      </div>
    </>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  boxShadow: "0px 0px 1px 1px",
  fontSize: "1rem",
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: "60px",
  width: "11rem",
  margin: "auto",
  cursor: "default",
  "&:hover": {
    backgroundColor: "bieseg", // Example hover effect
    opacity: 0.7,
    cursor: "pointer",
    boxShadow: "1px 1px 3px 1px",
  },
}));
