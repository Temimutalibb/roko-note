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
      <div style={styles.body}>
        <div style={styles.bodyDiv}>
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
            <div
              style={{
                fontFamily: "Sixtyfour Convergence",
                fontWeight: 400,
                fontStyle: "normal",
              }}
            >
              roko Note
            </div>
            <ItemHome>signin with google</ItemHome>
            <ItemHome>sign in with facebook</ItemHome>
            <ItemHome>signin with github</ItemHome>
            <ItemHome onClick={() => setFormDisplay(!formDisplay)}>
              {" "}
              continue with email
            </ItemHome>
            <Link to="/guest" style={{ textDecoration: "none" }}>
              <ItemHome> continue as guest</ItemHome>
            </Link>
          </Box>

          {formDisplay && (
            <UserForm formDisplay={() => setFormDisplay(!formDisplay)} />
          )}
        </div>
      </div>
    </>
  );
}

const styles = {
  body: {
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'><text x='0' y='20' font-size='20' fill='gray' fill-opacity='0.4'>roko</text></svg>\")",
    backgroundRepeat: "repeat",
    zIndex: -1,
    backgroundSize: "auto",
    margin: 0,
    padding: 0,
    fontFamily: "Doto",
  },
  bodyDiv: {
    padding: "2rem",
    borderRadius: 2,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    margin: "auto",
    width: "20rem",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
    height: "auto",
    maxHeight: "30rem",
    marginBottom: "2rem",
  },
};
