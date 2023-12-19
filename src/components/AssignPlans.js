import React, { useEffect, useState } from "react";
import "../styles/views.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ReactLoading from "react-loading";

export default function AssignPlans() {
  const [memberData, setMemberData] = useState(null);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/memberdetails").then((docs) => {
      console.log(docs.data);
      setMemberData(docs.data);
    });
  }, []);

  function dietDetails(member) {
    handleShow();
    setModalData(member);
  }

  return (
    <div className="container">
      <h1>Plans/Diet Allocation:</h1> <hr />
      {memberData !== null ? (
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
                    <button className="btn-members">Plan</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <ReactLoading
          type="bubbles"
          color="rgb(209, 100, 50)"
          className="loading"
        />
      )}
      <DietModal show={show} handleClose={handleClose} modalData={modalData} />
    </div>
  );
}

function DietModal(props) {
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
      <form className="edit-member-form">
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
          <input type="text" id="breakfast"></input> <br />
          <label htmlFor="lunch">Lunch: </label>
          <input type="text" id="lunch"></input> <br />
          <label htmlFor="dinner">Dinner: </label>
          <input type="text" id="dinner"></input>
          <label htmlFor="protein">Protein(gms/day): </label>
          <input type="text" id="protein"></input>
          <label htmlFor="comments">Comments: </label>
          <textarea
            id="comments"
            rows={3}
            style={{ verticalAlign: "middle" }}
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
