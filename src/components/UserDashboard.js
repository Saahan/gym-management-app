import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import NavBar from "./NavBar.js";
import Profile from "./Profile.js";
import Plans from "./Plans.js";
import About from "./About.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function UserDashboard(props) {
  const [view, setView] = useState("Profile");
  const storage = getStorage();

  function selectView(e) {
    console.log(e.target.innerHTML);
    setView(e.target.innerHTML);
  }

  useEffect(() => {
    getDownloadURL(ref(storage, `profile-pics/${props.userData.uid}`))
      .then((url) => {
        const img = document.getElementById("profile-pic");
        img.setAttribute("src", url);
      })
      .catch((error) => {
        console.log(error);
        const img = document.getElementById("profile-pic");
        img.setAttribute("src", "/img/blank_profile.jpg");
      });
  }, [props.userData.uid, storage]);

  return (
    <div>
      <NavBar />
      <div>
        <div className="sidebar">
          <div className="text-center" style={{ marginTop: "30px" }}>
            <img
              alt="profile-pic"
              id="profile-pic"
              width={100}
              height={100}
              style={{ borderRadius: "100px" }}
            ></img>
          </div>
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
