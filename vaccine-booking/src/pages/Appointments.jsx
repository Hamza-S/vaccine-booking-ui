import React from "react";
import { Container, Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import "./style.css";
import Calendar from "react-calendar";
import { useHistory } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import { useEffect } from "react";
import AppointmentSelect from "./AppointmentSelect";
import AppointmentBooking from "./AppointmentBooking";
import ConfirmBooking from "./ConfirmBooking";
export default function Appointments() {
  const [value, setValue] = React.useState(new Date());
  const [booking, setBooking] = React.useState(null);
  const [step, setStep] = React.useState(0);
  const [appointments, setAppointments] = React.useState([]);
  let history = useHistory();
  useEffect(() => {
    // Update the document title using the browser API
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

  function returnHome() {
    history.push("/");
  }
  function availableAppointments(day) {
    let appCounter = 0;
    let appointment = [];
    if (day % 2 == 0) {
      appCounter += 1;
      appointment.push({
        location: "Toronto General Hospital",
        address: "200 Elizabeth St, Toronto, ON M5G 2C4",
        vaccine: "Moderna",
        time: "10:00",
      });
    }
    if (day % 3 == 0) {
      appCounter += 1;
      appointment.push({
        location: "Mount Sinai Hospital",
        address: "600 University Ave, Toronto, ON M5G 1X5",
        vaccine: "Pfizer",
        time: "11:20",
      });
    }
    if (day % 5 == 0) {
      appCounter += 1;
      appointment.push({
        location: "Sunnybrook Health Sciences Centre",
        address: "2075 Bayview Ave, Toronto, ON M4N 3M5",
        vaccine: "AstraZeneca",
        time: "14:10",
      });
    }
    if (day % 7 == 0) {
      appCounter += 1;
      appointment.push({
        location: "St. Michael's Hospital",
        address: "36 Queen St E, Toronto, ON M5B 1W8",
        vaccine: "Moderna",
        time: "15:40",
      });
    }
    if (day % 11 == 0) {
      appCounter += 1;
      appointment.push({
        location: "Stalendo Hospital Toronto",
        address: "622 University Ave, Toronto, ON M5G 1X7",
        vaccine: "Pfizer",
        time: "17:30",
      });
    }
    console.log(appointment);
    setAppointments(appointment);
  }
  const bookAppointment = (location, address, vaccine, time) => {
    let string = Math.floor(Date.now() / 1000).toString();
    let booking = {
      location: location,
      address: address,
      vaccine: vaccine,
      time: time,
      key: "appointBooking" + string,
    };

    setBooking(booking);
    nextStep();
  };
  const selectedDate = (v, e) => {
    console.log("Selected " + v.getUTCDate());
    setValue(v);
    availableAppointments(parseInt(v.getUTCDate()));
  };
  const setappointmentforbooking = (loc, add, vacc, tim) => {};
  const nextStep = () => {
    let next_step = step + 1;
    if (next_step == 3) {
      localStorage.setItem(booking.key, JSON.stringify(booking));
    }
    setStep(next_step);
  };
  const goBack = () => {
    let next_step = step - 1;
    setStep(next_step);
    if (next_step < 0) {
      history.push("/");
    }
  };
  switch (step) {
    case 0:
      return (
        <div className="App">
          <Container className="container">
            <Row className="container_row">
              <div className="home_container">
                <Row>
                  <Col xs={3}></Col>
                  <Col xs={6}>
                    <h1>Book an Appointment</h1>
                  </Col>
                  <Col xs={3}>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Language
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>English</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">French</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Mandarin
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Row className="homeButtons">
                  <Calendar onChange={selectedDate} value={value} />
                  <h3>{appointments.length} appointments available</h3>

                  <div className="d-grid gap-2" id="buttonContainer_2">
                    <Button variant="primary" size="lg" onClick={nextStep}>
                      View Appointments for {value.yyyymmdd()}
                    </Button>
                    <Button variant="primary" size="lg" onClick={goBack}>
                      Go Back
                    </Button>
                  </div>
                </Row>
              </div>
            </Row>
          </Container>
        </div>
      );
    case 1:
      return (
        <div>
          <AppointmentSelect
            nextStep={nextStep}
            goBack={goBack}
            appointments={appointments}
            bookAppointment={bookAppointment}
            date={value}
          />
        </div>
      );
    case 2:
      return (
        <div>
          <AppointmentBooking
            nextStep={nextStep}
            goBack={goBack}
            booking={booking}
          />
        </div>
      );
    case 3:
      return (
        <div>
          <ConfirmBooking booking={booking} returnHome={returnHome} />
        </div>
      );
  }
}
