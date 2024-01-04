import React, { useEffect, useState } from "react";
import "../styles/views.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactLoading from "react-loading";
import { Card } from "react-bootstrap";
import { domainName } from "../Functions/portVariable";

export default function AssignPlans() {
  // this is an admin-only view where the admin can assign a diet plan to the member
  const [memberData, setMemberData] = useState(null);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalDietData, setModalDietData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get(`${domainName}/api/memberdetails`).then((docs) => {
      console.log("user details useffect", docs.data);
      setMemberData(docs.data);
    });
  }, []);

  function dietDetails(member) {
    //get the existing diet data in the database and render it onto the form in the bootstrap modal. This data can also be edited and saved to the database.
    handleShow();
    setModalData(member);
    setModalDietData([]);
    axios
      .get(`${domainName}/api/dietdetails`, {
        params: {
          uid: member.uid,
        },
      })
      .then((docs) => {
        console.log("modal diet data", docs.data);
        setModalDietData(docs.data[0]);
      });
  }

  return (
    <div className="container">
      <h1>Diet Allocation:</h1> <hr />
      {memberData !== null ? (
        <div>
          <table className="members-table">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
              {memberData.map((item) => {
                return (
                  <tr key={item.uid}>
                    <td>{item.fname + " " + item.lname}</td>
                    <td>{item.email}</td>
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="btn-members"
                        onClick={() => {
                          dietDetails(item);
                        }}
                      >
                        Diet
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {memberData.map((item) => {
            return (
              <Card
                key={item.uid}
                className="members-card"
                style={{ width: "100%", marginBottom: "20px" }}
              >
                <Card.Body>
                  <span>Name: {item.fname + " " + item.lname}</span> <br />
                  <span>Email: {item.email}</span>
                  <br />
                  <button
                    style={{ marginTop: "20px" }}
                    className="btn-members"
                    onClick={() => {
                      dietDetails(item);
                    }}
                  >
                    Diet
                  </button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      ) : (
        <ReactLoading
          type="bubbles"
          color="rgb(209, 100, 50)"
          className="loading"
        />
      )}
      <DietModal
        show={show}
        handleClose={handleClose}
        modalData={modalData}
        modalDietData={modalDietData}
      />
    </div>
  );
}

function DietModal(props) {
  //a modal which allows to edit the diet data for the member. A "PUT" request is made to the backend to store the edited data.
  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "put",
      url: `${domainName}/api/updatedietdetails`,
      data: {
        uid: props.modalData.uid,
        breakfast: e.target[1].value,
        lunch: e.target[2].value,
        dinner: e.target[3].value,
        proteinAmount: e.target[4].value,
        comments: e.target[5].value,
      },
      headers: { "content-type": "application/json" },
    }).then((res) => console.log(res));
  }

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "rgb(209, 100, 50)", color: "white" }}
      >
        <Modal.Title>Diet Details Entry</Modal.Title>
      </Modal.Header>
      <form className="edit-member-form" onSubmit={handleSubmit}>
        <Modal.Body>
          <label htmlFor="email">For: </label>
          <input
            type="email"
            id="email"
            disabled
            defaultValue={props.modalData.email}
          ></input>
          <br />
          <label htmlFor="breakfast">Breakfast: </label>
          <input
            type="text"
            id="breakfast"
            defaultValue={props.modalDietData && props.modalDietData.breakfast}
          ></input>{" "}
          <br />
          <label htmlFor="lunch">Lunch: </label>
          <input
            type="text"
            id="lunch"
            defaultValue={props.modalDietData && props.modalDietData.lunch}
          ></input>{" "}
          <br />
          <label htmlFor="dinner">Dinner: </label>
          <input
            type="text"
            id="dinner"
            defaultValue={props.modalDietData && props.modalDietData.dinner}
          ></input>
          <label htmlFor="protein">Protein(gms/day): </label>
          <input
            type="text"
            id="protein"
            defaultValue={
              props.modalDietData && props.modalDietData.proteinAmount
            }
          ></input>
          <label htmlFor="comments">Comments: </label>
          <textarea
            id="comments"
            rows={3}
            style={{ verticalAlign: "middle" }}
            defaultValue={props.modalDietData && props.modalDietData.comments}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="btn-members"
            type="submit"
            onClick={props.handleClose}
          >
            Save
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
