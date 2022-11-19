import Header from "./HomeComponents/Header.js";
import ProfileAcc from "./ProComponents/ProfileAcc.js";
import "./Styles/Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabView: "ProfileAcc",
    };
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div id="profile-menu">
            <div id="profile-menu-content">
              <a href="/">
                <h3 id="profile-menu-title">
                  <FontAwesomeIcon icon="fa-solid fa-house" />
                </h3>
              </a>
              <ul id="profile-menu-list">
                <li
                  onClick={() => {
                    this.setTab("ProfileAcc");
                  }}
                >
                  Profile
                </li>
                <li
                  onClick={() => {
                    this.setTab("Saved");
                  }}
                >
                  Saved Jobs
                </li>
                <li>Applications</li>
                <li
                  onClick={() => {
                    this.setTab("Metrics");
                  }}
                >
                  Metrics
                </li>
              </ul>
            </div>
          </div>
          {this.renderOption()}
        </div>
      </div>
    );
  }

  setTab = (tab) => {
    this.setState({
      tabView: tab,
    });
  };

  renderOption = () => {
    if (this.state.tabView === "ProfileAcc") {
      return <ProfileAcc />;
    } else if (this.state.tabView === "Saved") {
      // return <Saved />;
    } else if (this.state.tabView === "Metrics") {
      // return <Metrics />;
    }
  };

  componentDidMount() {
    this.populateState();
  }

  async populateState() {
    fetch(`https://localhost:7171/Profile`, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }).then((res) => {
      console.log(res);
    });
  }
}

export default Profile;
