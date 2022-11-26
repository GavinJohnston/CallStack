import React from "react";
import Profile from "./Profile";
import Employer from "./Employer";
import {
  token,
  routeRedirect,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

const ProfileGuard = ({ token, routeRedirect }) => {
  const location = useLocation();

  let jwtRole;

  if (localStorage.getItem(token)) {
    let jwt = localStorage.getItem(token);

    let jwtData = jwt.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let jwtJson = JSON.parse(decodedJwtJsonData);

    jwtRole = jwtJson.role;
  } else {
    return <Navigate to={routeRedirect} replace state={{ from: location }} />;
  }

  if (jwtRole == "Visitor") {
    return <Outlet />;
  } else if (jwtRole == "Employer") {
    window.location.href = "/";
  } else {
    return <Navigate to={routeRedirect} replace state={{ from: location }} />;
  }

  // return localStorage.getItem(token) ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to={routeRedirect} replace state={{ from: location }} />
  // );
};

export default ProfileGuard;
