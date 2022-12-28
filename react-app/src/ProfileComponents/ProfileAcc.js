import "../Styles/ProfileAcc.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProfileAcc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 id="formHeader">Profile</h2>
        <div className="profileContentBox">
          <form id="profileDataForm" onSubmit={this.updateProfile}>
            <h3 className="subHeader">Personal Details</h3>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  id="firstName"
                  name="FirstName"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  id="lastName"
                  name="LastName"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-Mail Address"
                  id="email"
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Website / GitHub"
                  id="website"
                  name="Website"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <select name="SkillLevel" id="skillLevel">
                  <option value="Junior / Entry Level">
                    Junior / Entry Level
                  </option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
              <div className="col-6">
                <select name="Education" id="education">
                  <option value="Self Taught">Self Taught</option>
                  <option value="College">College</option>
                  <option value="University">University</option>
                </select>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
          <div className="row">
            <h3 className="subHeader">Manage CV</h3>
            <div className="col-6">
              <input
                type="file"
                id="fileUpload"
                name="uploadFile"
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={() => {
                  this.fileSelected();
                }}
              />
              <input
                type="button"
                id="loadFileView"
                value="Browse.."
                onClick={() => {
                  this.getFile();
                }}
              />
              <div id="uploadComplete">
                <FontAwesomeIcon
                  icon="fa-solid fa-thumbs-up"
                  id="thumbsUpIcon"
                />
              </div>
              <div id="resumeDetails">
                <div
                  id="resumeTitle"
                  onClick={() => {
                    this.downloadCV();
                  }}
                ></div>
                <div id="resumeDate"></div>
                <div id="resumeDel">
                  <FontAwesomeIcon icon="fa-solid fa-x" />
                </div>
              </div>
            </div>
          </div>
          <form id="profileDataForm">
            <h3 className="subHeader">Update Password</h3>
            <div className="row">
              <div className="col-10">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Current Password"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <input
                  type="password"
                  className="form-control"
                  placeholder="New Password"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype Password"
                />
              </div>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.populateProfile();
    this.getCVInfo();
  }

  async populateProfile() {
    fetch(`https://localhost:7171/Profile`, {
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
        Object.keys(obj).forEach((key) => {
          if (obj[key] !== null) {
            document.getElementById(`${key}`).value = obj[key];
          }
        });
      });
  }

  updateProfile(e) {
    e.preventDefault();

    const form = document.getElementById("profileDataForm");

    var formData = new FormData(form);

    var dataObject = Object.fromEntries(formData);

    fetch(`https://localhost:7171/updateProfile`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(dataObject),
    });
  }

  getFile() {
    document.getElementById("fileUpload").click();
  }

  fileSelected() {
    const input = document.getElementById("fileUpload").files[0];

    var data = new FormData();
    data.append("file", input);

    fetch(`https://localhost:7171/PostCV`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain",
        // "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: data,
    }).then(() => {
      this.getCVInfo();
    });
  }

  getCVInfo() {
    fetch(`https://localhost:7171/getCVInfo`, {
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
        document.getElementById(
          "resumeDate"
        ).innerHTML = `Last Updated: ${obj.date}`;
        document.getElementById(
          "resumeTitle"
        ).innerHTML = `${obj.fileNameType}`;
      });
  }

  downloadCV() {
    fetch(`https://localhost:7171/downloadCV`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((r) => r.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "filename.docx";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }
}

export default ProfileAcc;
