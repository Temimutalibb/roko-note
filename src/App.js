import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Guess from "./components/guess";
import Home from "./components/home";
import MyEditor from "./components/test";

//export const server = "https://rokoserver.vercel.app/";
//for developing mode
export const backendServer = "http://localhost:4000/";
export const server = "https://rokoserver.vercel.app/";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="guest" element={<Guess />} />
          <Route path="test" element={<MyEditor />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
