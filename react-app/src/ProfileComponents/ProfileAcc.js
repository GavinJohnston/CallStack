import "../Styles/ProfileAcc.css";
import React from "react";
import { data, event } from "jquery";

class ProfileAcc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 id="formHeader">Your Profile</h2>
        <form id="profileDataForm" onSubmit={this.updateProfile}>
          <h3 className="subHeader">Personal Details</h3>
          <div className="row">
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                id="firstName"
                name="firstName"
              />
            </div>
            <div className="col-3">
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
                id="lastName"
                name="lastName"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="email"
                className="form-control"
                placeholder="E-Mail Address"
                id="email"
                name="email"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Website / GitHub"
                id="website"
                name="website"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <select name="Experience" id="skillLevel">
                <option value="Junior / Entry Level">
                  Junior / Entry Level
                </option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <div className="col-3">
              <select name="Education" id="education">
                <option value="Self Taught">Self Taught</option>
                <option value="College">College</option>
                <option value="University">University</option>
              </select>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
        <form id="profileDataForm">
          <h3 className="subHeader">Update Password</h3>
          <div className="row">
            <div className="col-3">
              <input
                type="password"
                className="form-control"
                placeholder="Current Password"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
              />
            </div>
            <div className="col-3">
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
    );
  }

  componentDidMount() {
    this.populateProfile();
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
}

export default ProfileAcc;