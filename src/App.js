import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Guess from "./components/guess";
import Home from "./components/home";

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
  //home page
  /* if (authorized === "notauthorized") {
    return <>{routes}</>;
  }
    */
}

export default App;
