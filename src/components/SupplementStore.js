import React from "react";
import "../styles/views.css";
import { shopData } from "../Functions/shopData";
import { Card, Col, Row } from "react-bootstrap";

export default function SupplementStore() {
  return (
    <div className="container">
      <h1>Supplement Store</h1> <hr />
      <Row>
        {shopData.map((item) => {
          return (
            <Col lg={4} sm={6} md={6}>
              <Card style={{ marginBottom: "20px", height: "200px" }}>
                <Card.Title style={{ height: "50px", padding: "5px" }}>
                  {item.name}
                </Card.Title>
                <Card.Body>
                  <span style={{ fontSize: "larger" }}>₹{item.price}</span>{" "}
                  <br />
                  <span>{item.weight}</span> <br />
                  <span>{item.description}</span>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
