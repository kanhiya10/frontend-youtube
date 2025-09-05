import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginModal from "../components/common/loginModal";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { info } = useSelector((state: any) => state.User);
  const isLoggedIn = !!info;
  const navigate=useNavigate();

  console.log("PrivateRoute - isLoggedIn:", isLoggedIn);

 if (!isLoggedIn) {
  return <LoginModal onClose={() => navigate(-1)} />;
}


  return children;
};

export default PrivateRoute;