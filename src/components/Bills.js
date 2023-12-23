import { React, useRef } from "react";
import "../styles/views.css";
import generatePDF from "react-to-pdf";

export default function Bills(props) {
  const targetRef = useRef();

  return (
    <div className="container">
      <h1>Bills:</h1> <hr/>
      <button
        style={{ float: "right" }}
        className="btn-members"
        onClick={() => generatePDF(targetRef, { filename: "bills.pdf" })}
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
