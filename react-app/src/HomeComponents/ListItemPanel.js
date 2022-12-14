import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Styles/ListItemPanel.css";

function ListItemPanel(props) {
  return (
    <div className="listItem" data={props.itemInfo.id}>
      <div className="ItemHeaderArea" data={props.itemInfo.id}>
        <h2>{props.itemInfo.title}</h2>
        <h3>{props.itemInfo.company}</h3>
      </div>
      <div className="ItemContent">
        <div className="ItemInfoArea" data={props.itemInfo.id}>
          <div className="iconContainer">
            <FontAwesomeIcon
              icon="fa-solid fa-location-dot"
              className="iconContainerIcon"
            />
            {props.itemInfo.location}, {props.itemInfo.country}
          </div>

          <div className="iconContainer">
            <FontAwesomeIcon
              icon="fa-solid fa-sterling-sign"
              className="iconContainerIcon"
            />
            {props.itemInfo.salary}
          </div>

          <div className="iconContainer">
            <FontAwesomeIcon
              icon="fa-solid fa-clock"
              className="iconContainerIcon"
            />
            {props.itemInfo.jobType}
          </div>

          <div className="iconContainer">
            <FontAwesomeIcon
              icon="fa-solid fa-building"
              className="iconContainerIcon"
            />
            {props.itemInfo.onSite}
          </div>
        </div>
        <div className="ItemDescArea">
          {props.itemInfo.descShort}
          <div id="postedDate">Posted on: {props.itemInfo.date}</div>
        </div>
      </div>
    </div>
  );
}

export default ListItemPanel;
