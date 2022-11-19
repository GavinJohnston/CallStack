import "./Styles/Register.css";
import Header from "./HomeComponents/Header.js";
import Footer from "./HomeComponents/Footer.js";

function Register() {
  return (
    <>
      <Header />
      <div className="container container-register">
        <div id="loginPanel">
          <h1>Register</h1>
          <form id="register-form" onSubmit={handleSubmit}>
            <div className="form-group form-group-login">
              <label htmlFor="RegisterEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="RegisterEmail"
                name="RegisterEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              {/* <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small> */}
            </div>
            <div className="form-group form-group-login">
              <label htmlFor="RegisterPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="RegisterPassword"
                name="RegisterPassword"
                placeholder="Password"
              />
            </div>
            <div className="form-group form-group-login">
              <label htmlFor="ConfirmRegisterPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="ConfirmRegisterPassword"
                name="ConfirmRegisterPassword"
                placeholder="Password"
              />
            </div>
            {/* <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div> */}
            <button type="submit" className="btn btn-formSubmit">
              Register
            </button>
            <ul id="registerformPanel"></ul>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );

  function handleSubmit(e) {
    e.preventDefault();

    const form = document.getElementById("register-form");

    var formData = new FormData(form);

    var dataObject = Object.fromEntries(formData);

    if (dataObject.RegisterPassword === dataObject.ConfirmRegisterPassword) {
      delete dataObject.ConfirmRegisterPassword;

      fetch(`https://localhost:7171/Register`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json, text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObject),
      })
        .then((r) =>
          r.json().then((data) => ({ status: r.status, body: data }))
        )
        .then((obj) => {
          if (obj.body.errors) {
            printErrors(obj.body.errors);
          }
        })
        .catch((error) => console.error("Unable to add item.", error));
    } else {
      let list = document.getElementById("registerformPanel");
      list.innerHTML = "";
      let listItem = document.createElement("li");
      listItem.innerHTML = `Passwords do not match.`;
      list.appendChild(listItem);
    }
  }

  function printErrors(errors) {
    let list = document.getElementById("registerformPanel");
    list.innerHTML = "";
    errors.forEach((el) => {
      let listItem = document.createElement("li");
      listItem.innerHTML = `${el.description}`;
      list.appendChild(listItem);
    });
  }
}

export default Register;
