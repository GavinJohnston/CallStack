import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faBookmark,
  faBuilding,
  faClock,
  faHeart,
  faHouse,
  faLayerGroup,
  faLocationDot,
  faLocationPin,
  faSterlingSign,
} from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Profile from "./Profile";
import Manager from "./Manager";
import Login from "./Login";
import Register from "./Register";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

library.add(
  fab,
  faLocationPin,
  faSterlingSign,
  faClock,
  faBuilding,
  faHeart,
  faLocationDot,
  faHouse,
  faBookmark,
  faLayerGroup
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Manager" element={<Manager />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
