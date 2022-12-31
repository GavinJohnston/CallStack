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
      <div className="row">
        <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-12">
          <div id="AdContainerAwaiting" className="adContainer">
            <h4 id="approvalHeader">Saved Ads</h4>
            <ul id="awaitingApproval">{generateData(notApproved)}</ul>
          </div>
        </div>
        <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-12">
          <div id="AdContainerApproved" className="adContainer">
            <h4 id="approvalHeader">Live Ads</h4>
            <ul id="Approved">{generateData(approved)}</ul>
          </div>
        </div>
      </div>
    </div>
  );

  function generateData(type) {
    if (type.length > 0) {
      return type.map((item) => (
        <ListItemManager key={uniqid()} itemInfo={item} />
      ));
    } else {
      return <li id="noAds">No Advertisements to show.</li>;
    }
  }
}

export default postManage;
