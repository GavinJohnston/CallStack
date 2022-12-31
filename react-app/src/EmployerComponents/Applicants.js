import React from "react";
import "../Styles/Applicants.css";

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
          <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-12">
            <select
              id="applicantTitles"
              onChange={() => {
                this.showApplicationsList();
              }}
            ></select>
            <ul id="applicationsList"></ul>
          </div>
          <div
            id="ApplicantsView"
            className="d-none d-sm-none d-md-none d-lg-block col-lg-6 col-xl-6"
          >
            <div className="sectionHeaders">Name</div>
            <h5 className="sectionContent" id="appfullName">
              &nbsp;
            </h5>
            <div className="sectionHeaders">Applied for</div>
            <h5 className="sectionContent" id="appadvertTitle">
              &nbsp;
            </h5>
            <div className="sectionHeaders">On</div>
            <h5 className="sectionContent" id="appdate">
              &nbsp;
            </h5>
            <div className="sectionHeaders">Education</div>
            <h5 className="sectionContent" id="appeducation">
              &nbsp;
            </h5>
            <div className="sectionHeaders">Skill Level</div>
            <h5 className="sectionContent" id="appskillLevel">
              &nbsp;
            </h5>
            <div className="sectionHeaders">Website</div>
            <h5 className="sectionContent" id="appwebsite">
              &nbsp;
            </h5>
            <div className="sectionHeaders">E-Mail</div>
            <h5 className="sectionContent" id="appemail">
              &nbsp;
            </h5>
            <div className="sectionHeaders">CV</div>
            <h5 className="sectionContent" id="appfileNameType"></h5>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.getCVs();
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

      this.showApplicationsList(Applicants);
    }
  }

  showApplicationsList(Applicants) {
    let title = document.getElementById("applicantTitles").value;

    let titleArray;

    for (var array in Applicants) {
      if (array == title) {
        titleArray = Applicants[array];
      }
    }

    let applicationsList = document.getElementById("applicationsList");

    let applicationsItem = document.createElement("li");
    applicationsItem.className = "applicationsItem";

    titleArray.forEach((item) => {
      applicationsItem.innerHTML = `${item.fullName} applied on ${item.date}`;

      applicationsList.appendChild(applicationsItem);

      applicationsItem.addEventListener("click", () => {
        this.viewApplication(item);
      });
    });
  }

  viewApplication(obj) {
    Object.keys(obj).forEach((key) => {
      if (document.getElementById(`app${key}`) !== null) {
        document.getElementById(`app${key}`).innerHTML = obj[key];
      }
    });

    document.getElementById("appfileNameType").onclick = () => {
      this.getFile(obj.cVid, obj.fileNameType);
    };
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
