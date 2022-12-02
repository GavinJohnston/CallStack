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
        <form id="profileDataForm">
          <h3 className="subHeader">Contact Details</h3>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                placeholder="Company / Group"
                id="companyGroup"
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
              />
            </div>
          </div>
          <button>Submit</button>
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
}

export default EmployerAcc;
