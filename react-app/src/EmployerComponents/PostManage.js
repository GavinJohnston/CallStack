import ListItemManager from "./ListItemManager.js";
import React from "react";
import uniqid from "uniqid";
import "../Styles/PostManage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { tab } from "@testing-library/user-event/dist/tab.js";
import { render } from "@testing-library/react";

class postManage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="postManage">
        <h2 id="formHeader">Manage Advertisements</h2>
        <div className="row" id="postManageContent">
          <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-12">
            <div id="sortMenu">
              <p
                className="showFilter"
                id="showLive"
                onClick={() => {
                  this.filterList("showLive");
                }}
              >
                Live
              </p>
              <p>|</p>
              <p
                className="showFilter"
                id="showAwaiting"
                onClick={() => {
                  this.filterList("showAwaiting");
                }}
              >
                Awaiting Approval
              </p>
              <p>|</p>
              <p id="rotateList">
                <FontAwesomeIcon icon="fa-solid fa-rotate" />
              </p>
            </div>
            <ul id="advertList">{this.generateData()}</ul>
          </div>
        </div>
      </div>
    );
  }

  filterList = (status) => {
    if (document.getElementById(status).className == "deselected") {
      document.getElementById(status).className = "";
    } else {
      document.getElementById(status).className = "deselected";
    }

    this.props.updateList();
  };

  generateData = () => {
    let Lists = this.props.Lists.viewable;

    if (Lists.length > 0) {
      return Lists.map((item) => (
        <ListItemManager
          key={uniqid()}
          itemInfo={item}
          ViewDataPage={(itemInfo) => {
            this.props.ViewDataPage(itemInfo);
          }}
        />
      ));
    } else {
      return <li id="noAds">No Advertisements to show.</li>;
    }
  };
}

export default postManage;
