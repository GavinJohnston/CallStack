import { data } from "jquery";
import "../Styles/Popup.css";

function Popup(props) {
  return (
    <>
      <div id="popupBackground">
        <form id="updateAdvertForm">
          <h2 id="formTitle">Manage XXX</h2>
          <div id="formPanels">
            <div className="formPanel" id="formPanelLeft">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Job Title"
                    name="title"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company / Group"
                    name="company"
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-7">
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    placeholder="Town, City.."
                    name="location"
                  />
                </div>
                <div className="form-group col-md-5">
                  <select
                    id="inputState"
                    className="form-control"
                    name="country"
                  >
                    <option defaultValue>Country</option>
                    <option>Scotland</option>
                    <option>England</option>
                    <option>Ireland</option>
                    <option>Wales</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Salary"
                    name="salary"
                  />
                </div>
                <div className="col">
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="jobType"
                    >
                      <option defaultValue>Contract</option>
                      <option>Full-Time</option>
                      <option>Part-time</option>
                      <option>Temporary</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      name="onSite"
                    >
                      <option>On-Site / Remote</option>
                      <option>On-Site</option>
                      <option>Hybrid</option>
                      <option>Remote</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <textarea
                    className="form-control"
                    id="shortDesc"
                    rows="4"
                    placeholder="List Each Job Benefit Seperate By A Comma"
                    name="benefits"
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <textarea
                    className="form-control"
                    id="shortDesc"
                    rows="4"
                    placeholder="Write a short job bio"
                    name="descShort"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="formPanel" id="formPanelRight">
              <textarea
                className="form-control"
                id="descArea"
                placeholder="Job Description"
                name="descriptionArea"
              ></textarea>
              <div id="submitArea">
                <div id="liveContainer">
                  <div id="liveBox">
                    <label htmlFor="isApproved">Approve: </label>
                    <input type="checkbox" id="isApproved" name="isApproved" />
                  </div>
                </div>
                <div id="submitBtns">
                  <button
                    type="submit"
                    id="postFormUpdate"
                    className="postFormBtn"
                    onClick={updateAdvert}
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    id="postFormDelete"
                    className="postFormBtn"
                    onClick={deleteAdvert}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );

  function updateAdvert(e) {
    e.preventDefault();

    let id = document.getElementById("updateAdvertForm").getAttribute("data");

    const form = document.getElementById("updateAdvertForm");

    var formData = new FormData(form);

    var dataObject = Object.fromEntries(formData);

    dataObject.id = id;
    dataObject.isApproved = document.getElementById("isApproved").checked;

    fetch(`https://localhost:7171/updateItem/${id}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(dataObject),
    })
      .then(() => {
        // window.location.reload();
      })
      .catch((error) => console.error("Unable to update item.", error));
  }

  function deleteAdvert(e) {
    e.preventDefault();

    let id = document.getElementById("updateAdvertForm").getAttribute("data");

    fetch(`https://localhost:7171/deleteItem/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => console.error("Unable to delete item.", error));
  }
}

export default Popup;
