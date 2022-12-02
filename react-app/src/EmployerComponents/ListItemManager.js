import "../Styles/ListItemManager.css";

function ListItemManager(props) {
  return (
    <>
      <li className="advert" onClick={() => showData(props.itemInfo.id)}>
        <div className="advertInfo">
          <p className="advertTitle">{props.itemInfo.title}</p>
          <div className="dateInfo">
            <p className="advertPosted">Posted</p>
            <p className="advertDate">{props.itemInfo.date}</p>
          </div>
        </div>
      </li>
    </>
  );

  function showData(id) {
    document.getElementById("popupBackground").style.display = "block";
    document.getElementById("popup-back").style.display = "block";

    document
      .getElementById("updateAdvertForm")
      .setAttribute("data", `${props.itemInfo.id}`);

    let keys = Object.keys(props.itemInfo);

    document.getElementById("formTitle").innerHTML = `${props.itemInfo.title}`;

    for (let i = 0; i < keys.length; i++) {
      if (document.getElementsByName(keys[i])[0]) {
        document.getElementsByName(keys[i])[0].value = `${
          props.itemInfo[keys[i]]
        }`;
      }
    }

    if (props.itemInfo.isApproved == true) {
      document.getElementById("isApproved").checked = true;
    } else {
      document.getElementById("isApproved").checked = false;
    }
  }
}

export default ListItemManager;
