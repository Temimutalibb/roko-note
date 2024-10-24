import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Guess from "./components/guess";
import Home from "./components/home";

export const server = "https://rokoserver.vercel.app/";
//for developing mode
export const backendServer = "http://localhost:4000";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="guess" element={<Guess />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
