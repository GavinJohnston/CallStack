import React from "react";
import "../Styles/Applications.css";

class Applications extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 id="formHeader">Applications</h2>
        <ul id="MyApplicationsList"></ul>
      </div>
    );
  }

  componentDidMount() {
    this.populateApplications();
  }

  async populateApplications() {
    fetch(`https://localhost:7171/getMyApplications`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        let MyApplicationsList = document.getElementById("MyApplicationsList");
        MyApplicationsList.innerHTML = "";

        let MyApplicationItem = document.createElement("li");

        obj.forEach((element) => {
          MyApplicationItem.innerHTML = `
          <p>${element.advertTitle}<p> 
          <div>Applied on ${element.date}</div>
          <div class="appDate">Revoke</div>
          `;

          MyApplicationItem.className = "applicationItem";
          MyApplicationsList.appendChild(MyApplicationItem);
        });
      });
  }
}

export default Applications;
