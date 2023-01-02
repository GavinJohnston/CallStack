import "../Styles/ListItemManager.css";
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
          <div className="advertInfo">
            <p className="advertTitle">{this.props.itemInfo.title}</p>
            <div className="dateInfo">
              <p className="advertPosted">Posted</p>
              <p className="advertDate">{this.props.itemInfo.date}</p>
            </div>
          </div>
        </li>
      </>
    );
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        document.getElementById("popupBackground").style.display = "none";
        document.getElementById("popup-back").style.display = "none";
      }
    });
  }

  showData(id) {
    if (window.innerWidth >= 768) {
      document.getElementById("popupBackground").style.display = "block";
      document.getElementById("popup-back").style.display = "block";

      document
        .getElementById("updateAdvertForm")
        .setAttribute("data", `${this.props.itemInfo.id}`);

      let keys = Object.keys(this.props.itemInfo);

      document.getElementById(
        "formTitle"
      ).innerHTML = `${this.props.itemInfo.title}`;

      for (let i = 0; i < keys.length; i++) {
        if (document.getElementsByName(keys[i])[0]) {
          document.getElementsByName(keys[i])[0].value = `${
            this.props.itemInfo[keys[i]]
          }`;
        }
      }

      if (this.props.itemInfo.isApproved == true) {
        document.getElementById("isApproved").checked = true;
      } else {
        document.getElementById("isApproved").checked = false;
      }
    } else {
      this.props.ViewDataPage(this.props.itemInfo);
    }
  }
}

export default ListItemManager;
