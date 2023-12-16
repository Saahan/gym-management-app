import React, { useState } from "react";
import "../styles/dashboard.css";
import NavBar from "./NavBar.js";
import Profile from "./Profile.js";
import Plans from "./Plans.js";
import About from "./About.js";

export default function UserDashboard(props) {
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
          {view === "Plans" && <Plans userData={props.userData} />}
          {view === "About" && <About />}
        </div>
      </div>
    </div>
  );
}
