import logo from "./logo.svg";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  HashRouter,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Appointments from "./pages/Appointments";
import AppointmentBooking from "./pages/AppointmentBooking";
import ManageAppointments from "./pages/ManageAppointments";
function App() {
  return (
    <HashRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/manage_appointments">
            <ManageAppointments />
          </Route>
          <Route path="/find_appointment">
            <Appointments />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default withRouter(App);
