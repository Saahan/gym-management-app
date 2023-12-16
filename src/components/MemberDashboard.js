import React, { useState } from "react";
import NavBar from "./NavBar.js";
import "../styles/dashboard.css";
import Profile from "./Profile.js";
import Plans from "./Plans.js";
import About from "./About.js";
import Notifications from "./Notifications.js";
import Bills from "./Bills.js";

export default function MemberDashboard(props) {
  const [view, setView] = useState("Profile");

  function selectView(e) {
    console.log(e.target.innerHTML);
    setView(e.target.innerHTML);
  }

  return (
    <div>
      <NavBar />
      <div>
        <div className="sidebar">
          <div className="user-welcome">
            Welcome, <br />
            {props.userData.fname}
          </div>
          <hr />
          <div
            className={view === "Profile" ? "active" : undefined}
            onClick={selectView}
          >
            Profile
          </div>
          <div
            className={view === "Notifications" ? "active" : undefined}
            onClick={selectView}
          >
            Notifications
          </div>
          <div
            className={view === "Bills" ? "active" : undefined}
            onClick={selectView}
          >
            Bills
          </div>
          <div
            className={view === "Plans" ? "active" : undefined}
            onClick={selectView}
          >
            Plans
          </div>
          <div
            className={view === "About" ? "active" : undefined}
            onClick={selectView}
          >
            About
          </div>
        </div>
        <div className="main-screen">
          {view === "Profile" && <Profile userData={props.userData} />}
          {view === "Notifications" && (
            <Notifications userData={props.userData} />
          )}
          {view === "Bills" && <Bills userData={props.userData} />}
          {view === "Plans" && <Plans userData={props.userData} />}
          {view === "About" && <About />}
        </div>
      </div>
    </div>
  );
}
