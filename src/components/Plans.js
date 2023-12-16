import React from "react";
import "../styles/views.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Plans(props) {
  return (
    <div className="container">
    <h1>Plans</h1><hr />
      <Row>
        <Col sm className="card-col">
          <Card style={{ width: "15rem", height: "16rem" }}>
            <Card.Header className="card-header">Trial</Card.Header>
            <Card.Body className="card-body">
              <Card.Title>Free</Card.Title>
              <Card.Text>
                <li>1 Week Validity</li>
                <li>Trainer Provided</li>
                <li>Free Body Assessment</li>
                <li>Locker Provided</li>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm className="card-col">
          <Card style={{ width: "15rem", height: "16rem" }}>
            <Card.Header className="card-header">Monthly</Card.Header>
            <Card.Body className="card-body">
              <Card.Title>₹900 per mo.</Card.Title>
              <Card.Text>
                <li>Renews Every Month</li>
                <li>Trainer Provided</li>
                <li>Diet Plan Provided</li>
                <li>Free Body Assessment</li>
                <li>Locker Provided</li>
                <li>Sauna Access</li>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm className="card-col">
          <Card style={{ width: "15rem", height: "16rem" }}>
            <Card.Header className="card-header">Quarterly</Card.Header>
            <Card.Body className="card-body">
              <Card.Title>₹2500 per 3 mo.</Card.Title>
              <Card.Text>
                <li>Renews Every Quarter</li>
                <li>Trainer Provided</li>
                <li>Diet Plan Provided</li>
                <li>Free Body Assessment</li>
                <li>Locker Provided</li>
                <li>Sauna Access</li>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {props.userData.accountType === "member" && <p>* Please contact the manager to get a plan</p>}
      {props.userData.accountType === "user" && <p>* Please contact the manager to get a membership and enroll in a plan</p>}
    </div>
  );
}
