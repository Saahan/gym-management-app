import React from "react";
import "../styles/dashboard.css";

export default function UserSideBar(props) {
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
        className={props.view === "Plans" ? "active" : undefined}
        onClick={selectView}
      >
        Plans
      </div>
      <div
        className={props.view === "About" ? "active" : undefined}
        onClick={selectView}
      >
        About
      </div>
    </div>
  );
}
