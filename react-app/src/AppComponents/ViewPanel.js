import "../Styles/ViewPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewPanel(props) {
  function showBenefits() {
    if (
      document.getElementById("benefitsWindow").style.display == "inline-block"
    ) {
      document.getElementById("benefitsWindow").style.display = "none";
    } else {
      document.getElementById("benefitsWindow").style.display = "inline-block";
    }
  }

  function bookmarkJob() {
    if (
      document.getElementById("bookmarkIcon").style.color == "rgb(98, 218, 251)"
    ) {
      document.getElementById("bookmarkIcon").style.color = "rgba(0, 0, 0, 0)";
    } else {
      document.getElementById("bookmarkIcon").style.color = "rgb(98, 218, 251)";
    }
  }

  return (
    <div id="viewPanel">
      <div id="viewPanelHeader">
        <div className="headerData">
          <h2 id="viewHeaderJob">{props.itemInfo.title}</h2>
          <h3 id="viewHeaderCompany">{props.itemInfo.company}</h3>
        </div>
        <div className="bookmarkContainer">
          <FontAwesomeIcon
            icon="fa-solid fa-bookmark"
            id="bookmarkIcon"
            alt="Bookmark Job"
            onClick={() => {
              bookmarkJob();
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
          <li className="panelListItem">
            <div className="iconContainer">
              <FontAwesomeIcon icon="fa-solid fa-heart" />
            </div>
            <div
              id="listItemBenefits"
              onMouseEnter={() => {
                showBenefits();
              }}
              onMouseLeave={() => {
                showBenefits();
              }}
            >
              Benefits
              <div id="benefitsWindow">{props.itemInfo.benefits}</div>
            </div>
          </li>
        </ul>
        <h4>Description</h4>
        <p id="viewPanelDescription">{props.itemInfo.descriptionArea}</p>
        <div id="applyNow">Apply Now</div>
      </div>
    </div>
  );
}

export default ViewPanel;
