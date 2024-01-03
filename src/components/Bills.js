import { React, useRef } from "react";
import "../styles/views.css";
import generatePDF from "react-to-pdf";

export default function Bills(props) {
  const targetRef = useRef();
  //props.userData.bills is the array of bills which were created by the admin for the user, this component renders that array in a list

  return (
    <div className="container">
      <h1>Bills:</h1> <hr/>
      <button
        style={{ float: "right" }}
        className="btn-members"
        onClick={() => generatePDF(targetRef, { filename: "bills.pdf" })} //the bill data can be saved as a pdf by the user, using a library called "react-to-pdf", targetRef will be the div that needs to be saved
      >
        Save PDF
      </button>
      <div className="profile-div" ref={targetRef}>
        {props.userData.bills.length !== 0 ? (
          props.userData.bills.map((item) => {
            return (
              <div className="bills-div" key={item.invoiceNumber}>
                <ul>
                  <li>Amount (₹): {item.amount}</li>
                  <li>Date: {item.date}</li>
                  <li>Invoice No.: {item.invoiceNumber}</li>
                  <li>Comments: {item.comment}</li>
                </ul>
              </div>
            );
          })
        ) : (
          <p>No bills data found</p>
        )}
      </div>
    </div>
  );
}
