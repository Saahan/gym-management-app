import React, { useState } from "react";
import "../styles/views.css";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";

export default function Profile(props) {
  const storage = getStorage();
  const storageRef = ref(storage, `/profile-pics/${props.userData.uid}`);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    //store profile pics after validation (< 1MB not allowed) in firebase storage, and set the feedback message state accordingly
    e.preventDefault();
    let profilePic = e.target[0].files[0];
    //console.log(e.target[0].files[0]);
    if (profilePic && profilePic.size < 1024000) {
      uploadBytes(storageRef, profilePic).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        navigate(0);
      });
    } else if (profilePic === undefined) {
      setMessage("No file selected");
    } else {
      setMessage("Please keep file size under 1MB");
    }
  }

  return (
    //render profile and diet details, and allow users to change/upload profile pictures via a form
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
          <hr />
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
      <hr />
      <form onSubmit={handleSubmit} className="profile-div">
        <label htmlFor="profile-pic" style={{ marginBottom: "10px" }}>
          Upload/Change Profile Picture:
        </label>{" "}
        <br />
        <input
          type="file"
          id="profile-pic"
          accept="image/png, image/jpeg"
        />{" "}
        <br />
        <Button variant="primary" className="btn-upload" type="submit">
          Save
        </Button>
      </form>
      <hr />
      {message !== "" && (
        <p style={{ color: "red", display: "inline-block" }}>{message}</p>
      )}
    </div>
  );
}
