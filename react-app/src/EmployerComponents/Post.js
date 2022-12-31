import { data } from "jquery";
import "../Styles/Post.css";

function Post() {
  return (
    <div>
      <form id="postAdvertForm" onSubmit={handleSubmit}>
        <h2 id="formHeader">Post Advertisement</h2>
        <div className="row form-containers">
          <div className="col-lg-6 col-xl-6 col-md-12 col-sm-12 col-12">
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
                <select id="inputState" className="form-control" name="country">
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
                    name="jobtype"
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
                    name="onsite"
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
                  style={{ resize: "none" }}
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
                  name="DescShort"
                  style={{ resize: "none" }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="right-col col-lg-6 col-xl-6 col-md-12 col-sm-12 col-12">
            <div id="descCol">
              <div className="row">
                <div className="col">
                  <textarea
                    className="form-control"
                    placeholder="Job Description"
                    name="descriptionArea"
                    id="descArea"
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div id="submitArea">
                    <div id="submitBtns">
                      <button
                        type="submit"
                        id="postFormClear"
                        className="postFormBtn"
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        id="postFormSubmit"
                        className="postFormBtn"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  function handleSubmit(e) {
    e.preventDefault();

    const form = document.getElementById("postAdvertForm");

    var formData = new FormData(form);

    var dataObject = Object.fromEntries(formData);

    dataObject.isApproved = false;

    fetch(`https://localhost:7171/PostAdvert`, {
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
      .then((response) => response.json())
      .then(() => {
        // window.location.reload();
      })
      .catch((error) => console.error("Unable to add item.", error));

    form.reset();
  }
}

export default Post;
