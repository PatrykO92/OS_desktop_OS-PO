import { Navigate, Outlet } from "react-router-dom";

const LoggedInChecker = () => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) return <Outlet />;
  else return <Navigate to="/startScreen" />;
};

export default LoggedInChecker;
