import { useNavigate } from "react-router-dom";
import DashBoard from "./dashboard";
import Header from "./header";

export default function AuthenticateUser() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tab");
    navigate("/");
  };

  const profile = localStorage.getItem("email");

  return (
    <>
      <Header profile={profile} logout={logout} />
      <DashBoard />
    </>
  );
}
