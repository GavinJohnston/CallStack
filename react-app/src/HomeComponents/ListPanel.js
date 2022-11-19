import "../Styles/ListPanel.css";
import ListItemPanel from "./ListItemPanel.js";
import uniqid from "uniqid";

function ListPanel(props) {
  let approved = props.approved;

  return (
    <div id="listPanel" onClick={viewItem}>
      {approved.map((item) => (
        <ListItemPanel key={uniqid()} itemInfo={item} />
      ))}
    </div>
  );

  function viewItem(event) {
    let e = event.target.closest(".listItem");

    let itemId = e.getAttribute("data");

    for (let i = 0; i < approved.length; i++) {
      if (approved[i].id == itemId) {
        props.onViewItem(approved[i]);

        break;
      }
    }
  }
}

export default ListPanel;
