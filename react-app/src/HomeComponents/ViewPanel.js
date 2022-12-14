import "../Styles/ViewPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewPanel(props) {
  function showBenefits() {
    if (document.getElementById("benefitsWindow").style.display == "flex") {
      document.getElementById("benefitsWindow").style.display = "none";
    } else {
      document.getElementById("benefitsWindow").style.display = "flex";
    }
  }

  function bookmarkJob(postId) {}

  return (
    <div
      id="viewPanel"
      className="d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block col-7"
    >
      <div id="viewPanelHeader">
        <div className="headerData">
          <h2 id="viewHeaderJob">{props.itemInfo.title}&nbsp; </h2>
          <h3 id="viewHeaderCompany">{props.itemInfo.company}&nbsp; </h3>
        </div>
        <div className="bookmarkContainer">
          <FontAwesomeIcon
            icon="fa-solid fa-bookmark"
            id="bookmarkIcon"
            alt="Bookmark Job"
            onClick={() => {
              bookmarkJob(`${props.itemInfo.id}`);
            }}
          />
        </div>
      </div>
      <div id="viewPanelDescriptionArea">
        <ul id="viewPanelList">
          <li className="panelListItem">
            <div className="iconContainer">
              <FontAwesomeIcon icon="fa-solid fa-location-dot" />
            </div>
            {props.itemInfo.location}, {props.itemInfo.country}
          </li>
          <li className="panelListItem">
            <div className="iconContainer">
              <FontAwesomeIcon icon="fa-solid fa-sterling-sign" />
            </div>
            {props.itemInfo.salary}
          </li>
          <li className="panelListItem">
            <div className="iconContainer">
              <FontAwesomeIcon icon="fa-solid fa-clock" />
            </div>
            {props.itemInfo.jobType}
          </li>
          <li className="panelListItem">
            <div className="iconContainer">
              <FontAwesomeIcon icon="fa-solid fa-building" />
            </div>
            {props.itemInfo.onSite}
          </li>
        </ul>
        <h4>Description</h4>
        <p id="viewPanelDescription">{props.itemInfo.descriptionArea}</p>
        <h4>Benefits</h4>
        <p id="viewPanelBenefits">{props.itemInfo.benefits}</p>
        <div id="applyArea">
          <div
            id="applyNow"
            onClick={() => {
              sendCV(`${props.itemInfo.id}`);
            }}
          >
            Apply Now
          </div>
        </div>
        <div id="postedDate">Posted on: {props.itemInfo.date}</div>
      </div>
    </div>
  );

  function sendCV(AdvertId) {
    var dataObject = new Object();

    dataObject.AdvertId = AdvertId;

    fetch(`https://localhost:7171/sendCV`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(dataObject),
    }).then(() => {
      let applyArea = document.getElementById("applyArea");

      applyArea.innerHTML = "";

      var applied = document.createElement("div");

      applied.id = "applied";
      applied.innerHTML = `<b>${props.itemInfo.company}</b> has your application!`;

      applyArea.appendChild(applied);
    });
  }
}

export default ViewPanel;
