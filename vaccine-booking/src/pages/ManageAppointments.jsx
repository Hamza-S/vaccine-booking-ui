import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Dropdown,
  Form,
  Modal,
} from "react-bootstrap";
import "./style.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
export default function ManageAppointments() {
  const [booking, setBooking] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [target, setTarget] = React.useState("");
  let history = useHistory();
  const location = useLocation();
  useEffect(() => {
    let bookings = [];
    for (var i in window.localStorage) {
      let val = localStorage.getItem(i);
      if (val != null) {
        bookings.push(JSON.parse(val));
        console.log(bookings);
      }
    }
    setBooking(bookings);
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

  function confirmCancel(key) {
    setTarget(key);
    setShow(true);
  }

  function cancelAppointment() {
    localStorage.removeItem(target);
    setShow(false);
    let bookings = [];
    for (var i in window.localStorage) {
      let val = localStorage.getItem(i);
      if (val != null) {
        bookings.push(JSON.parse(val));
        console.log(bookings);
      }
    }
    setBooking(bookings);
  }

  return (
    <div className="App">
      <Container className="container">
        <Row className="container_row">
          <div className="home_container_2">
            <Row>
              <Col xs={3}></Col>
              <Col xs={6}>
                <h2>Manage Appointments</h2>
                {booking.map((booking) => {
                  return (
                    <div className="appointmentCard">
                      <h5>{booking.location}</h5>
                      <h6>{booking.address}</h6>
                      <h6>Vaccine offered: {booking.vaccine}</h6>
                      <h5>
                        @ <b>{booking.time}</b>
                      </h5>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => confirmCancel(booking.key)}
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{ marginLeft: "2px" }}
                        variant="primary"
                        size="md"
                        onClick={() => {
                          history.push("/find_appointment");
                        }}
                      >
                        Reschedule
                      </Button>
                    </div>
                  );
                })}
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
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Return to Home
                </Button>
              </div>
            </Row>
          </div>
        </Row>
      </Container>
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Appointment?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel your appointment?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            Go Back
          </Button>
          <Button variant="danger" onClick={cancelAppointment}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
