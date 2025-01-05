import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AuthenticateUser from "./components/authenticateuser";
import Guess from "./components/guess";
import Home from "./components/home";
import InviteDraft from "./components/invitedraft";
import NotFound from "./components/notfound";
//export const server = "https://rokoserver.vercel.app/";
//for developing mode
//export const server = "http://localhost:4000/";
export const server = "https://rokoserver.vercel.app/";

window.global = window;
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invitedraft/:id" element={<InviteDraft />} />
          <Route path="guest" element={<Guess />} />
          <Route path="authorized" element={<AuthenticateUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
