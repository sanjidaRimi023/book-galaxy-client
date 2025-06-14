import React, { use } from "react";
import { Authcontext } from "../Context/AuthContext";
import LoadSppiner from "../Components/LoadSppiner";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = use(Authcontext);
  if (loading) {
    return <LoadSppiner />;
  }
  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
