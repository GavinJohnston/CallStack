import React from "react";
import uniqid from "uniqid";
import "../Styles/Applicants.css";
import ApplicantViewer from "./ApplicantViewer.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toBeChecked } from "@testing-library/jest-dom/dist/matchers";

class Applicants extends React.Component {
  constructor(props) {
    super(props);
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
            <div id="tableSort">
              <select id="applicantTitles">
                <option>Show All</option>
                {this.generateTitles()}
              </select>
              <form
                id="sortTitle"
                name="sortTitle"
                onChange={() => {
                  this.sortData();
                }}
              >
                Sort: <label htmlFor="Job Title">Job Title</label>
                <input
                  type="radio"
                  id="Job Title"
                  name="sortedSelection"
                  value="advertTitle"
                />
                <label htmlFor="Applied">Applied</label>
                <input
                  type="radio"
                  id="Applied"
                  name="sortedSelection"
                  value="date"
                />
                <label htmlFor="Education">Education Level</label>
                <input
                  type="radio"
                  id="Education"
                  name="sortedSelection"
                  value="education"
                />
                <label htmlFor="Skill Level">Skill Level</label>
                <input
                  type="radio"
                  id="Skill Level"
                  name="sortedSelection"
                  value="skillLevel"
                />
              </form>
            </div>
            <table id="applicantTable">
              <thead>
                <tr id="applicantHeader">
                  <th>
                    <div>Job Title</div>
                  </th>
                  <th>
                    <div>Name</div>
                  </th>
                  <th>
                    <div>Applied On</div>
                  </th>
                  <th>
                    <div>Education Level</div>
                  </th>
                  <th>
                    <div>Skill Level</div>
                  </th>
                  <th>
                    <div>Website / Portfolio</div>
                  </th>
                  <th>
                    <div>CV</div>
                  </th>
                  <th>
                    <div>
                      <FontAwesomeIcon icon="fa-solid fa-check" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>{this.generateData()}</tbody>
            </table>
            <div id="tableOptions">
              <p id="deleteCV">
                Reject{"  "}
                <FontAwesomeIcon icon="fa-solid fa-trash-can" />
              </p>
              <p id="sendLike">
                Like {"  "}
                <FontAwesomeIcon icon="fa-solid fa-thumbs-up" />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  generateTitles = () => {
    let Lists = this.props.Applicants;

    for (var array in Lists) {
      return <option>{array}</option>;
    }
  };

  generateData = () => {
    let Lists = this.props.Applicants;

    for (var array in Lists) {
      return Lists[array].map((item) => (
        <ApplicantViewer key={uniqid()} itemInfo={item} />
      ));
    }
  };

  sortData = () => {
    let radios = document.sortTitle.sortedSelection;

    let sortOption;

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked == true) {
        sortOption = radios[i].value;
      }
    }

    this.props.sortApplicants(sortOption);
  };
}

export default Applicants;
