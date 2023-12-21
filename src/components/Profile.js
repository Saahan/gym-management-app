import React from "react";
import "../styles/views.css";

export default function Profile(props) {
  return (
    <div className="container">
      <h1>Profile</h1> <hr />
      <h5>Personal Details:</h5>
      <div className="profile-div">
        <p>Name: {props.userData.fname + " " + props.userData.lname}</p>
        <p>Email: {props.userData.email}</p>
        <p>Phone Number: {props.userData.phoneNumber}</p>
        {props.userData.accountType === "admin" ? (
          <p>Account: Admin</p>
        ) : (
          <p>
            Account:{" "}
            {props.userData.accountType === "user" ? "Guest" : "Member"}
          </p>
        )}

        <p>
          Selected Plan:{" "}
          {props.userData.plan === "" ? "N/A" : props.userData.plan}
        </p>
      </div>
      {props.userData.accountType === "member" && props.dietData !== null && (
        <div>
          <h5>Diet Details:</h5>
          <div className="profile-div">
            <p>Breakfast: {props.dietData.breakfast}</p>
            <p>Lunch: {props.dietData.lunch}</p>
            <p>Dinner: {props.dietData.dinner}</p>
            <p>Proteins (gms/day): {props.dietData.proteinAmount}</p>
            <p>Comments: {props.dietData.comments}</p>
          </div>
        </div>
      )}
    </div>
  );
}
