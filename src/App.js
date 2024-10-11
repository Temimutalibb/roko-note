import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashBoard from "./components/dashboard";
import Header from "./components/header";
import Home from "./components/home";

function App() {
  const [authorized, setAuthorized] = useState("loading");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:4000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const username = response.data.user.id;
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

  if (authorized === "authorized") {
    return (
      <>
        <Header />
        <DashBoard />;
      </>
    );
  }

  if (authorized === "notauthorized") {
    return (
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="dashboard" element={<DashBoard />} />
          </Routes>
        </Router>
      </>
    );
  }
}

export default App;
