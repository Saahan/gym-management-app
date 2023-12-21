import React, { useEffect, useState } from "react";
import NavBar from "./NavBar.js";
import "../styles/dashboard.css";
import Profile from "./Profile.js";
import Plans from "./Plans.js";
import About from "./About.js";
import Notifications from "./Notifications.js";
import Bills from "./Bills.js";
import axios from "axios";

export default function MemberDashboard(props) {
  const [view, setView] = useState("Profile");
  const [dietData, setDietData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/dietdetails", {
        params: {
          uid: props.userData.uid,
        },
      })
      .then((res) => {
        console.log("diet data", res.data);
        setDietData(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.userData.uid]);

  function selectView(e) {
    console.log(e.target.innerHTML);
    setView(e.target.innerHTML);
  }

  function refresh(e) {
    setView("");
    setTimeout(() => {
      setView(e);
    }, 100);
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
          {view === "Profile" && (
            <Profile userData={props.userData} dietData={dietData} />
          )}
          {view === "Notifications" && (
            <Notifications userData={props.userData} refresh={refresh} />
          )}
          {view === "Bills" && <Bills userData={props.userData} />}
          {view === "Plans" && <Plans userData={props.userData} />}
          {view === "About" && <About />}
        </div>
      </div>
    </div>
  );
}
