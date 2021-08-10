import React from "react";
import { Container, Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./style.css";
export default function Home(props) {
  let history = useHistory();
  return (
    <div className="App">
      <Container className="container">
        <Row className="container_row">
          <div className="home_container_1">
            <Row>
              <Col xs={3}></Col>
              <Col xs={6}>
                <h1>Vaccine Booking System</h1>
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
              <div className="d-grid gap-2" id="buttonContainer">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    history.push("/find_appointment");
                  }}
                >
                  Book Appointment
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    history.push("/manage_appointments");
                  }}
                >
                  Manage Appointment(s)
                </Button>
              </div>
            </Row>
          </div>
        </Row>
      </Container>
    </div>
  );
}
