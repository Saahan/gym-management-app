import React from "react";
import "../styles/dashboard.css";

export default function AdminSideBar(props) {
  function selectView(e) {
    props.selectView(e);
    props.handleClose();
  }

  return (
    <div className={props.sideBarResponsive}>
      <div className="text-center" style={{ marginTop: "30px" }}>
        <img
          alt="profile-pic"
          id="profile-pic"
          width={100}
          height={100}
          style={{ borderRadius: "100px" }}
          src={props.profilePicUrl}
        ></img>
      </div>
      <div className="user-welcome">
        Welcome, <br />
        {props.userData.fname}
      </div>
      <hr />
      <div
        className={props.view === "Profile" ? "active" : undefined}
        onClick={selectView}
      >
        Profile
      </div>
      <div
        className={props.view === "Members" ? "active" : undefined}
        onClick={selectView}
      >
        Members
      </div>
      <div
        className={props.view === "Add Members" ? "active" : undefined}
        onClick={selectView}
      >
        Add Members
      </div>
      <div
        className={props.view === "Create Bills" ? "active" : undefined}
        onClick={selectView}
      >
        Create Bills
      </div>
      <div
        className={props.view === "Diet" ? "active" : undefined}
        onClick={selectView}
      >
        Diet
      </div>
      <div
        className={props.view === "Store Management" ? "active" : undefined}
        onClick={selectView}
      >
        Store Management
      </div>
    </div>
  );
}
