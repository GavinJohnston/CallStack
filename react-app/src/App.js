import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import Manager from "./Manager";
import Login from "./Login";
import Register from "./Register";
import NoMatch from "./NoMatch";
import RouteGuard from "./RouteGuard";

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
              element={<RouteGuard token="user-token" routeRedirect="/Login" />}
            >
              <Route path="/Profile" element={<Profile />} />
            </Route>
            <Route
              element={<RouteGuard token="user-token" routeRedirect="/Login" />}
            >
              <Route path="/Manager" element={<Manager />} />
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
