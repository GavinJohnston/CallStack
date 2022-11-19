import React from "react";
import {
  token,
  routeRedirect,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

const RouteGuard = ({ token, routeRedirect }) => {
  const location = useLocation();

  return localStorage.getItem(token) ? (
    <Outlet />
  ) : (
    <Navigate to={routeRedirect} replace state={{ from: location }} />
  );
};

export default RouteGuard;
