import "../Styles/ProfileAcc.css";

function ProfileAcc() {
  return (
    <div>
      <h2 id="formHeader">Your Profile</h2>
      <form id="profileDataForm">
        <h3 className="subHeader">Personal Details</h3>
        <div className="row">
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              placeholder="First name"
            />
          </div>
          <div className="col-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              type="email"
              className="form-control"
              placeholder="E-Mail Address"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Website / GitHub"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <select name="Experience" id="experienceLevel">
              <option value="volvo">Junior / Entry Level</option>
              <option value="saab">Mid Level</option>
              <option value="mercedes">Senior</option>
            </select>
          </div>
          <div className="col-3">
            <select name="Education" id="educationAttainment">
              <option value="volvo">Self Taught</option>
              <option value="saab">College</option>
              <option value="mercedes">University</option>
            </select>
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

export default ProfileAcc;
