import ListItemManager from "./ListItemManager.js";
import React from "react";
import uniqid from "uniqid";
import "../Styles/PostManage.css";

function postManage(props) {
  let notApproved = props.Lists.notApproved;
  let approved = props.Lists.approved;

  return (
    <div id="postManage">
      <h2 id="formHeader">Manage Advertisements</h2>
      <div id="adContainers">
        <div id="AdContainerAwaiting" className="adContainer">
          <h4 id="approvalHeader">Awaiting Approval</h4>
          <ul id="awaitingApproval">
            {notApproved.map((item) => (
              <ListItemManager key={uniqid()} itemInfo={item} />
            ))}
          </ul>
        </div>
        <div id="AdContainerApproved" className="adContainer">
          <h4 id="approvalHeader">Live Ads</h4>
          <ul id="Approved">
            {approved.map((item) => (
              <ListItemManager key={uniqid()} itemInfo={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default postManage;
