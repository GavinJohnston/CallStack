import "../Styles/ListItemManager.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

class ListItemManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <li
          className="advert"
          onClick={() => this.showData(this.props.itemInfo.id)}
        >
          <div className="dateBox">{this.props.itemInfo.date}</div>
          <div className="advertInfo">
            <div className="infoBox">
              <div className="titleBox">{this.props.itemInfo.title}</div>
              <div
                className={
                  this.props.itemInfo.isApproved == true
                    ? "liveColour statusIcon"
                    : "notLiveColour statusIcon"
                }
              >
                {this.props.itemInfo.isApproved == true
                  ? "Live"
                  : "Awaiting Approval"}
              </div>
              <div className="shortDesc">{this.props.itemInfo.descShort}</div>
              <div
                id="arrow"
                className={
                  this.props.itemInfo.isApproved == true
                    ? "liveColour"
                    : "notLiveColour"
                }
              >
                <FontAwesomeIcon icon="fa-solid fa-arrow-right" />
              </div>
            </div>
          </div>
        </li>
      </>
    );
  }

  showData(id) {
    this.props.ViewDataPage(this.props.itemInfo);
  }
}

export default ListItemManager;
