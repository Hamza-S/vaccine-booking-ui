import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  Form,
} from "react-bootstrap";
import "./style.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function ConfirmBooking({ booking, returnHome }) {
  const [value, setValue] = React.useState(new Date());
  const location = useLocation();
  useEffect(() => {
    availableAppointments(parseInt(new Date().getUTCDate()));
  }, []);
  Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ].join("/");
  };

  function availableAppointments(day) {
    let appCounter = 0;
    let appointment = [];
    if (day % 2 == 0) {
      appCounter += 1;
      appointment.push("10:00");
    }
    if (day % 3 == 0) {
      appCounter += 1;
      appointment.push("11:20");
    }
    if (day % 5 == 0) {
      appCounter += 1;
      appointment.push("14:10");
    }
    if (day % 7 == 0) {
      appCounter += 1;
      appointment.push("15:40");
    }
    if (day % 11 == 0) {
      appCounter += 1;
      appointment.push("17:30");
    }
    console.log(appointment);
  }

  return (
    <div className="App">
      <Container className="container">
        <Row className="container_row">
          <div className="home_container_2">
            <Row>
              <Col xs={3}></Col>
              <Col xs={6}>
                <h2>Appointment Successfully Booked</h2>
                <h5>{booking.location}</h5>
                <h6>{booking.address}</h6>
                <h6>Vaccine offered: {booking.vaccine}</h6>
                <h5>
                  @ <b>{booking.time}</b>
                </h5>
              </Col>
              <Col xs={3}>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Language
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>English</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">French</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Mandarin</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className="homeButtons">
              <Col sm={4}></Col>
              <div className="d-grid gap-2" id="buttonContainer_2">
                <Button variant="primary" size="lg" onClick={returnHome}>
                  Return to Home
                </Button>
              </div>
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
}
