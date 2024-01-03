import React, { useEffect, useState } from "react";
import "../styles/views.css";
import axios from "axios";
import ReactLoading from "react-loading";
import Button from "react-bootstrap/Button";

export default function CreateBills() {
  //this is an admin-only view which allows the admin to create bills for the member. This action also sends a notification to the user that a bill has been created.
  const [memberData, setMemberData] = useState(null);
  const [doneMessage, setDoneMessage] = useState(false);

  useEffect(() => {
    //get a list of members
    axios.get("http://localhost:5000/api/memberdetails").then((docs) => {
      console.log("member list data:", docs.data);
      setMemberData(docs.data);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    //post bills data to the backend
    axios({
      method: "post",
      url: "http://localhost:5000/api/addbillitem",
      data: {
        uid: e.target[0].value,
        amount: e.target[1].value,
        date: e.target[2].value,
        invoiceNumber: e.target[3].value,
        comments: e.target[4].value,
      },
      headers: { "content-type": "application/json" },
    }).catch((err) => {
      console.log("bills error", err);
    });

    document.getElementById("bills-form").reset();
    setDoneMessage(true);
    setTimeout(() => {
      setDoneMessage(false);
    }, 3000);
  }

  return (
    <div className="container">
      <h1>Create Bills: </h1> <hr />
      {memberData !== null ? (
        <form
          className="edit-member-form"
          onSubmit={handleSubmit}
          id="bills-form"
        >
          <label htmlFor="user">For:</label>
          <select>
            {memberData.map((item) => {
              return (
                <option key={item.uid} value={item.uid}>
                  {item.email}
                </option>
              );
            })}
          </select>{" "}
          <br />
          <label htmlFor="amount">Amount (₹): </label>
          <input type="text" id="amount"></input> <br />
          <label htmlFor="date">Paid On: </label>
          <input type="date" id="date"></input> <br />
          <label htmlFor="invoice">Invoice No.: </label>
          <input type="text" id="invoice"></input> <br />
          <label htmlFor="comments">Comments: </label>
          <input type="text" id="comments"></input> <br />
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="secondary"
              type="reset"
              style={{ marginRight: "20px" }}
            >
              Reset
            </Button>
            <Button variant="primary" className="btn-members" type="submit">
              Create
            </Button>
          </div>
        </form>
      ) : (
        <ReactLoading
          type="bubbles"
          color="rgb(209, 100, 50)"
          className="loading"
        />
      )}
      <br />
      {doneMessage === true && (
        <p style={{ color: "green" }}>Successfully created bill!</p>
      )}
    </div>
  );
}
