import React, { useState } from "react";
import { app } from "../firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/main.css";
import { useNavigate } from "react-router-dom";
import validateUserData from "../Functions/validateUserData.js";

export default function SignUp() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [validationText, setValidationText] = useState("");

  function handleSignUp(e) {
    e.preventDefault();
    let userData = {
      fname: e.target[0].value,
      lname: e.target[1].value,
      email: e.target[2].value,
      phoneNumber: e.target[3].value,
      password: e.target[4].value,
      password2: e.target[5].value,
    };

    let isValidated = validateUserData(userData)[0];

    if (isValidated) {
      createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((userCredential) => {}) //do a post request here to post user data to database
        .catch((err) => {
          console.log(err);
        });
    } else {
      setValidationText(validateUserData(userData)[1]);
    }
  }
  return (
    <div className="main-container">
      <div className="text-center">
        <h2 style={{ marginBottom: "20px" }}>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="First Name"
                className="mb-3"
              >
                <input
                  type="text"
                  id="firstname"
                  placeholder="Enter First Name"
                  className="form-control"
                  required
                ></input>
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3"
              >
                <input
                  type="text"
                  id="lastname"
                  placeholder="Enter Last Name"
                  className="form-control"
                  required
                ></input>
              </FloatingLabel>
            </Col>
          </Row>

          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <input
              type="email"
              id="email"
              placeholder="abc@example.com"
              className="form-control"
              required
            ></input>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <input
              type="text"
              id="phonenumber"
              placeholder="Enter Phone No."
              className="form-control"
              required
            ></input>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3"
          >
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control"
              required
            ></input>
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Confirm Password"
            className="mb-3"
          >
            <input
              type="password"
              id="confirmpassword"
              placeholder="Enter Password"
              className="form-control"
              required
            ></input>
          </FloatingLabel>

          <button type="submit" className="button">
            Create Account
          </button>
        </form>
        <button
          className="button-signup"
          onClick={() => {
            navigate("/");
          }}
        >
          Already have an account?
        </button>
      </div>
      <span style={{ color: "red" }}>{validationText}</span>
    </div>
  );
}
