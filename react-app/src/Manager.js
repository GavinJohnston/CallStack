import "./Styles/Manager.css";

import Header from "./AppComponents/Header.js";
import Post from "./AccComponents/Post.js";
import Popup from "./AccComponents/Popup.js";
import PostManage from "./AccComponents/PostManage.js";

import React from "react";
import Footer from "./AppComponents/Footer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notApproved: [],
      approved: [],
      tabView: "Account",
    };
  }

  render() {
    return (
      <div>
        <Popup />
        <div
          id="popup-back"
          onClick={() => {
            this.hidePopup();
          }}
        ></div>
        <Header />
        <div id="manager-content">
          <div className="container container-main">
            <div id="profile-menu">
              <div id="profile-menu-content">
                <a href="/">
                  {" "}
                  <h3 id="profile-menu-title">
                    <FontAwesomeIcon icon="fa-solid fa-house" />
                  </h3>
                </a>
                <ul id="profile-menu-list">
                  <li
                    onClick={() => {
                      this.setTab("Account");
                    }}
                  >
                    Account
                  </li>
                  <li
                    onClick={() => {
                      this.setTab("Post");
                    }}
                  >
                    Post Ad
                  </li>
                  <li
                    onClick={() => {
                      this.setTab("PostManage");
                    }}
                  >
                    Manage Ads
                  </li>
                  <li>Applicants</li>
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
        <Footer />
      </div>
    );
  }

  setTab = (tab) => {
    this.setState({
      tabView: tab,
    });
  };

  renderOption = () => {
    if (this.state.tabView === "Post") {
      return <Post />;
    } else if (this.state.tabView === "PostManage") {
      return <PostManage Lists={this.state} />;
    }
  };

  hidePopup = () => {
    document.getElementById("popupBackground").style.display = "none";
    document.getElementById("popup-back").style.display = "none";
  };

  componentDidMount() {
    this.populateState();
  }

  async populateState() {
    const responseAwaiting = await fetch(
      `https://localhost:7171/notApprovedList`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const AwaitingApproval = await responseAwaiting.json();

    const responseApproved = await fetch(
      `https://localhost:7171/approvedList`,
      {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    const Approved = await responseApproved.json();

    this.setState({
      approved: Approved,
      notApproved: AwaitingApproval,
    });
  }
}

export default Manager;
