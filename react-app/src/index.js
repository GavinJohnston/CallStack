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
  faRightFromBracket,
  faSterlingSign,
  faFile,
  faX,
  faThumbsUp,
  faBars,
  faEllipsisVertical,
  faArrowRight,
  faRotate,
  faCircleArrowDown,
  faThumbsDown,
  faGear,
  faTrashCan,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
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
  faLayerGroup,
  faRightFromBracket,
  faFile,
  faX,
  faThumbsUp,
  faBars,
  faEllipsisVertical,
  faArrowRight,
  faRotate,
  faCircleArrowDown,
  faThumbsUp,
  faThumbsDown,
  faGear,
  faTrashCan,
  faCheck
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
