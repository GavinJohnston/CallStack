import React from "react";
import uniqid from "uniqid";
import "../Styles/Applicants.css";
import ApplicantViewer from "./ApplicantViewer.js";

class Applicants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicants: [],
    };
  }

  render() {
    return (
      <div>
        <h2 id="formHeader">Applicants</h2>
        <div className="row">
          <div
            className="col-lg-12 col-xl-12 col-md-12 col-sm-12 col-12"
            id="applicationsCol"
          >
            <select id="applicantTitles" onChange={() => {}}></select>
            <ul id="applicationsList"></ul>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getCVs();

    let applicationViewer = document.getElementById("applicationViewer");

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 990) {
        applicationViewer.style.display = "none";
      }
    });
  }

  getCVs() {
    fetch(`https://localhost:7171/getCVList`, {
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
        var sortedOBJ = {};

        for (var i = 0, max = obj.length; i < max; i++) {
          if (sortedOBJ[obj[i].advertTitle] == undefined) {
            sortedOBJ[obj[i].advertTitle] = [];
          }
          sortedOBJ[obj[i].advertTitle].push(obj[i]);
        }

        this.setState({
          applicants: sortedOBJ,
        });

        this.generateTitleBox();
      });
  }

  generateTitleBox() {
    let Applicants = this.state.applicants;

    let applicantTitles = document.getElementById("applicantTitles");

    let applicantTitle = document.createElement("option");

    for (var array in Applicants) {
      applicantTitle.setAttribute("value", array);
      applicantTitle.innerHTML = array;

      applicantTitles.appendChild(applicantTitle);
    }
  }

  getFile(id, filename) {
    let dataObject = {};

    dataObject.cVid = id;

    fetch(`https://localhost:7171/downloadCVEmployer`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(dataObject),
    })
      .then((r) => r.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }
}

export default Applicants;
