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
            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
          </div>
          {props.itemInfo.location}, {props.itemInfo.country}
          <div className="iconContainer">
            <FontAwesomeIcon icon="fa-solid fa-sterling-sign" />
          </div>
          {props.itemInfo.salary}
          <div className="iconContainer">
            <FontAwesomeIcon icon="fa-solid fa-clock" />
          </div>
          {props.itemInfo.jobType}
          <div className="iconContainer">
            <FontAwesomeIcon icon="fa-solid fa-building" />
          </div>
          {props.itemInfo.onSite}
        </div>
        <div className="ItemDescArea">{props.itemInfo.descShort}</div>
      </div>
    </div>
  );
}

export default ListItemPanel;
