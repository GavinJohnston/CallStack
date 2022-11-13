import "../Styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="side-container">
        <p id="logo">
          Call
          <FontAwesomeIcon icon="fa-layer-group" id="headerLogo" />
          Stack
        </p>
      </div>
      <div className="container"></div>
      <div className="side-container"></div>
    </nav>
  );
}

export default Header;
