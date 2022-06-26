import { Navigate, Outlet } from "react-router-dom";
import { isAuth } from "../store/storage";

const Index = () => {
  if (isAuth()) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
};

export default Index;
