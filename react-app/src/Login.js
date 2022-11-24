import "./Styles/Login.css";
import Header from "./HomeComponents/Header.js";
import Footer from "./HomeComponents/Footer.js";

function Login() {
  return (
    <>
      <Header />
      <div className="container container-login">
        <div id="loginPanel">
          <h1>Login</h1>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group form-group-login">
              <label htmlFor="LoginEmail">Email address</label>
              <input
                type="email"
                className="form-control"
                id="LoginEmail"
                name="LoginEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              {/* <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small> */}
            </div>
            <div className="form-group form-group-login">
              <label htmlFor="LoginPassword">Password</label>
              <input
                type="password"
                className="form-control"
                id="LoginPassword"
                name="LoginPassword"
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
              Login
            </button>
            <div className="form-group form-group-login">
              <a href="" id="forgotPass">
                Forgot Your Password?
              </a>
            </div>
            <ul id="loginformPanel"></ul>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );

  function handleSubmit(e) {
    e.preventDefault();

    const form = document.getElementById("login-form");

    var formData = new FormData(form);

    var dataObject = Object.fromEntries(formData);

    fetch(`https://localhost:7171/Login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObject),
    })
      .then((r) => r.json())
      .then((obj) => {
        if (obj == "Invalid Authentication") {
          let list = document.getElementById("loginformPanel");
          list.innerHTML = "";
          let listItem = document.createElement("li");
          listItem.innerHTML = `Login failed. Please try again.`;
          list.appendChild(listItem);
        } else {
          localStorage.setItem("token", JSON.stringify(obj));
          window.location = "/Profile";
        }
      });
  }
}

export default Login;

//.then((data) => ({ status: r.status, body: data }))
