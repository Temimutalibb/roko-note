import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../App";
import { UserForm } from "./authenticate";
import AuthenticateUser from "./authenticateuser";
import { ItemHome } from "./extras";

export default function Home() {
  const [formDisplay, setFormDisplay] = useState(false);
  const [authorized, setAuthorized] = useState("loading");

  //get the token, if exist login user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${server}protected`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const email = response.data.user.email;
          setAuthorized("authorized");
        })
        .catch((error) => {
          setAuthorized("notauthorized");
          console.error("Error accessing protected route:", error);
        });
    } else {
      setAuthorized("notauthorized");
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://rokoserver.vercel.app/test")
      .then((response) => {
        const email = response.data.message;
        alert(email);
      })
      .catch((error) => {
        setAuthorized("notauthorized");
        console.error("Error accessing protected route:", error);
      });
  }, []);

  //skeleton to display while the authenticated is loading
  if (authorized === "loading") {
    return (
      <>
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="rounded" height={200} />
        </Stack>
      </>
    );
  }

  //for authenticate user
  if (authorized === "authorized") {
    return (
      <>
        <AuthenticateUser />
      </>
    );
  }

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
          <ItemHome>signin with google</ItemHome>
          <ItemHome>sign in with facebook</ItemHome>
          <ItemHome>signin with github</ItemHome>
          <ItemHome onClick={() => setFormDisplay(!formDisplay)}>
            {" "}
            continue with email
          </ItemHome>
          <Link to="/guess" style={{ textDecoration: "none" }}>
            <ItemHome> continue as guess</ItemHome>
          </Link>
        </Box>

        {formDisplay && (
          <UserForm formDisplay={() => setFormDisplay(!formDisplay)} />
        )}
      </div>
    </>
  );
}
