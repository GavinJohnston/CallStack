import "../Styles/EmployerAcc.css";
import React from "react";

class EmployerAcc extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 id="formHeader">Account Management</h2>
        <div className="employerContentBox">
          <div className="row form-containers">
            <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-12">
              <form id="profileDataForm" onSubmit={this.updateProfile}>
                <h3 className="subHeader">Contact Details</h3>
                <div className="row">
                  <div className="col-12">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company / Group"
                      id="companyGroup"
                      name="CompanyGroup"
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
                      placeholder="Website"
                      id="website"
                      name="Website"
                    />
                  </div>
                </div>
                <button type="submit">Submit</button>
              </form>
              {/* </div>
            <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-12"> */}
              <form id="profileDataForm">
                <h3 className="subHeader">Update Password</h3>
                <div className="row">
                  <div className="col-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Current Password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
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
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.populateProfile();
  }

  async populateProfile() {
    fetch(`https://localhost:7171/Account`, {
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

    fetch(`https://localhost:7171/updateAccount`, {
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

export default EmployerAcc;
