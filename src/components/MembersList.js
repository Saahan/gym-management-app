import React, { useEffect, useState, useRef } from "react";
import "../styles/views.css";
import axios from "axios";
import ReactLoading from "react-loading";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import generatePDF from "react-to-pdf";
import { Card } from "react-bootstrap";
import { domainName } from "../Functions/portVariable";

export default function MembersList(props) {
  //this view is for Admin only, where he/she can edit member data and remove members
  const [memberData, setMemberData] = useState(null);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState([]);
  const targetRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    //get a list of members from the database, so that the admin can change
    axios.get(`${domainName}/api/memberdetails`).then((docs) => {
      console.log("member list data:", docs.data);
      setMemberData(docs.data);
    });
  }, []);

  function editMember(member) {
    //edit a member's personal details and also assign a monthly plan to the member.
    console.log(member);
    setModalData(member);
    handleShow();
  }

  function removeMember(uid) {
    //remove a member by sending the member uid to the backend and changing the accountType of the user to "guest"
    axios({
      method: "put",
      url: `${domainName}/api/cancelmembership`,
      data: {
        uid: uid,
      },
      headers: { "content-type": "application/json" },
    }).then((res) => console.log(res));

    props.refresh("Members");
  }

  return (
    <div className="container">
      <h1>Members:</h1>
      <hr />
      <button
        style={{ float: "right", marginBottom: "20px" }}
        className="btn-members"
        onClick={() => generatePDF(targetRef, { filename: "members.pdf" })}
      >
        Save PDF
      </button>{" "}
      <br />
      <div>
        {memberData !== null ? (
          <div>
            <table className="members-table" ref={targetRef}>
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone No.</th>
                  <th>Actions</th>
                </tr>
                {memberData.map((item) => {
                  return (
                    <tr key={item.uid} className="members-row">
                      <td>{item.fname + " " + item.lname}</td>
                      <td>{item.email}</td>
                      <td>{item.phoneNumber}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          className="btn-members"
                          onClick={() => editMember(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-members"
                          onClick={() => removeMember(item.uid)}
                        >
                          Remove
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
                    <span>Phone: {item.phoneNumber}</span>
                    <br />
                    <button
                      style={{ marginTop: "20px" }}
                      className="btn-members"
                      onClick={() => editMember(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-members"
                      onClick={() => removeMember(item.uid)}
                    >
                      Remove
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
      </div>
      <EditModal
        show={show}
        handleClose={handleClose}
        data={modalData}
        refresh={props.refresh}
      />
    </div>
  );
}

function EditModal(props) {
  const uid = props.data.uid;

  function handleSubmit(e) {
    e.preventDefault();
    //console.log(e);
    //console.log(uid);
    axios({
      method: "put",
      url: `${domainName}/api/updatememberdetails`,
      data: {
        fname: e.target[1].value,
        lname: e.target[2].value,
        phoneNumber: e.target[3].value,
        plan: e.target[4].value,
        uid: uid,
      },
      headers: { "content-type": "application/json" },
    }).then((res) => console.log(res));

    props.refresh("Members");
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
        <Modal.Title>Edit Member Data</Modal.Title>
      </Modal.Header>
      <form className="edit-member-form" onSubmit={handleSubmit}>
        <Modal.Body>
          <label htmlFor="lname">Email: </label>
          <input
            type="email"
            id="email"
            defaultValue={props.data.email}
            disabled
          ></input>{" "}
          <br />
          <label htmlFor="fname">First Name: </label>
          <input
            type="text"
            id="fname"
            defaultValue={props.data.fname}
          ></input>{" "}
          <br />
          <label htmlFor="lname">Last Name: </label>
          <input
            type="text"
            id="lname"
            defaultValue={props.data.lname}
          ></input>{" "}
          <br />
          <label htmlFor="phoneNumber">Phone No.: </label>
          <input
            type="text"
            id="phoneNumber"
            defaultValue={props.data.phoneNumber}
            maxLength={10}
          ></input>
          <label htmlFor="plan">Plan:</label>
          <select defaultValue={props.data.plan}>
            <option value="">Unassigned</option>
            <option value="Trial">Trial</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
          </select>
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
