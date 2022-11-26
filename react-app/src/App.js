import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Employer from "./Employer";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";
import ProfileGuard from "./ProfileGuard";
import EmployerGuard from "./EmployerGuard";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route
              element={<ProfileGuard token="token" routeRedirect="/Login" />}
            >
              <Route path="/Profile" element={<Profile />} />
            </Route>
            <Route
              element={<EmployerGuard token="token" routeRedirect="/Login" />}
            >
              <Route path="/Employer" element={<Employer />} />
            </Route>
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
}

export default App;
