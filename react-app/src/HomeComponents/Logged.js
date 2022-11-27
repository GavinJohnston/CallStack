import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Logged extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <a href="/" className="linkBtns" id="loggedBtn"></a>
        <a className="linkBtns">
          <FontAwesomeIcon
            icon="fa-solid fa-right-from-bracket"
            id="linkBtnsExit"
            onClick={this.logOut}
          />
        </a>
      </>
    );
  }

  componentDidMount() {
    this.loggedType();
  }

  loggedType = () => {
    if (this.props.role == "Visitor") {
      document.getElementById("loggedBtn").innerHTML = "Profile";
      document.getElementById("loggedBtn").href = "/Profile";
    } else if (this.props.role == "Employer") {
      document.getElementById("loggedBtn").innerHTML = "Account";
      document.getElementById("loggedBtn").href = "/Account";
    } else {
      return;
    }
  };

  logOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
}

export default Logged;
