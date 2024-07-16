import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginPopup from "./LoginPopup";

const AuthLayout = ({ children, authentication }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authentication && isAuthenticated !== authentication) {
      return;
    }
  }, [navigate, isAuthenticated, authentication]);

  if (authentication && isAuthenticated !== authentication) {
    return <LoginPopup />;
  }

  return children;
};

export default AuthLayout;
