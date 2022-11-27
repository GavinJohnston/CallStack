import "../Styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogRegBtns from "./LogRegBtns";
import Logged from "./Logged";

function Header() {
  let jwtRole;

  if (localStorage.getItem("token")) {
    let jwt = localStorage.getItem("token");

    let jwtData = jwt.split(".")[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let jwtJson = JSON.parse(decodedJwtJsonData);

    jwtRole = jwtJson.role;
  }

  function renderOption() {
    if (jwtRole == null) {
      return <LogRegBtns />;
    } else {
      return <Logged role={jwtRole} />;
    }
  }

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="side-container">
        <a href="/" id="logoLink">
          <p id="logo">
            Call
            <FontAwesomeIcon icon="fa-layer-group" id="headerLogo" />
            Stack
          </p>
        </a>
      </div>
      <div className="container"></div>
      <div className="side-container">{renderOption()}</div>
    </nav>
  );
}

export default Header;
