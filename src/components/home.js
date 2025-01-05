import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../App";
import { UserForm } from "./authenticate";
import { ItemHome } from "./extras";

export default function Home() {
  const [formDisplay, setFormDisplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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
          navigate("/authorized");
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  //skeleton to display while the authenticated is loading
  if (loading) {
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

  return (
    <>
      <div style={styles.homebody}>
        <Box
          sx={{
            backgroundColor: "white",
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            width: "20rem",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "hidden",
            overflowX: "hidden",
            gap: 2,
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
          <ItemHome onClick={() => setFormDisplay(!formDisplay)}>
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
    </>
  );
}

const styles = {
  homebody: {
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'><text x='0' y='20' font-size='20' fill='gray' fill-opacity='0.4'>roko</text></svg>\")",
    backgroundRepeat: "repeat",
    zIndex: -1,
    backgroundSize: "auto",
    fontFamily: "Doto",
    backgroundPosition: "center",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    flexwrap: "wrap",
    margin: 0,
    padding: 0,
    gap: 0,
  },
  bodyDiv: {
    backgroundColor: "blue",
    height: "auto",
  },
};
