import "../Styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
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
      <div className="side-container">
        <a href="Register" className="linkBtns">
          <button type="button" className="btn btn-menu">
            Register
          </button>
        </a>
        <a href="Login" className="linkBtns">
          <button type="button" className="btn btn-menu">
            {" "}
            Login
          </button>
        </a>
      </div>
    </nav>
  );
}

export default Header;
