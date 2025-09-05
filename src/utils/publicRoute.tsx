import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../app/home";


const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { info } = useSelector((state: any) => state.User);
  const isLoggedIn = !!info;
  const navigate=useNavigate();

  console.log("PublicRoute - isLoggedIn:", isLoggedIn);

 if (isLoggedIn) {
  return <Home/>;
}


  return children;
};

export default PrivateRoute;