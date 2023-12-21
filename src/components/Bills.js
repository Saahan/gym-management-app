import React from "react";
import "../styles/views.css";

export default function Bills(props) {
  return (
    <div className="container">
      <h1>Bills:</h1> <hr></hr>
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
  );
}
