import "./Styles/Employer.css";
import Header from "./HomeComponents/Header.js";
import Post from "./EmployerComponents/Post.js";
import Popup from "./EmployerComponents/Popup.js";
import EmployerAcc from "./EmployerComponents/EmployerAcc.js";
import PostManage from "./EmployerComponents/PostManage.js";
import React from "react";
import Footer from "./HomeComponents/Footer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Applicants from "./EmployerComponents/Applicants";

class Employer extends React.Component {
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
            <div className="row">
              <div className="d-none d-sm-block d-sm-none d-md-block">
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
                      <li
                        onClick={() => {
                          this.setTab("Applicants");
                        }}
                      >
                        Applicants
                      </li>
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
              </div>
              <div
                id="profile-col"
                className="d-block d-sm-block d-sm-block d-md-none"
              >
                <div id="profile-menu">
                  <div id="profile-menu-content" className="profile-menu-mini">
                    <a href="/">
                      {" "}
                      <h3 id="profile-menu-title">
                        <FontAwesomeIcon icon="fa-solid fa-house" />
                      </h3>
                    </a>
                    <select
                      name="profMenu"
                      id="profMenu"
                      onChange={() => {
                        this.selectTab();
                      }}
                    >
                      <option value="Account" selected="selected">
                        Account
                      </option>
                      <option value="Post">Post</option>
                      <option value="PostManage">Post Manage</option>
                      <option value="Applicants">Applicants</option>
                      <option value="Metrics">Metrics</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {this.renderOption()}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  selectTab = () => {
    let value = document.getElementById("profMenu").value;

    this.setState({
      tabView: value,
    });
  };

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
    } else if (this.state.tabView === "Account") {
      return <EmployerAcc />;
    } else if (this.state.tabView === "Applicants") {
      return <Applicants Lists={this.state.approved} />;
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

export default Employer;
