import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import NavBar from "./NavBar.js";
import Profile from "./Profile.js";
import Plans from "./Plans.js";
import About from "./About.js";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Offcanvas from "react-bootstrap/Offcanvas";
import UserSideBar from "./UserSideBar.js";

export default function UserDashboard(props) {
  // please see MemberDashboard.js for explanation
  const [view, setView] = useState("Profile");
  const storage = getStorage();
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function showSideBar() {
    handleShow();
  }

  function selectView(e) {
    console.log(e.target.innerHTML);
    setView(e.target.innerHTML);
  }

  useEffect(() => {
    getDownloadURL(ref(storage, `profile-pics/${props.userData.uid}`))
      .then((url) => {
        setProfilePicUrl(url);
      })
      .catch((error) => {
        console.log(error);
        setProfilePicUrl("/img/blank_profile.jpg");
      });
  }, [props.userData.uid, storage]);

  return (
    <div>
      <NavBar showSideBar={showSideBar} />
      <div>
        <UserSideBar
          selectView={selectView}
          view={view}
          userData={props.userData}
          handleClose={() => {}}
          profilePicUrl={profilePicUrl}
          sideBarResponsive={"sidebar"}
        />
        <div className="main-screen">
          {view === "Profile" && <Profile userData={props.userData} />}
          {view === "Plans" && <Plans userData={props.userData} />}
          {view === "About" && <About />}
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} style={{ width: "70%" }}>
        <UserSideBar
          userData={props.userData}
          view={view}
          selectView={selectView}
          handleClose={handleClose}
          profilePicUrl={profilePicUrl}
          sideBarResponsive={"sidebar-responsive"}
        />
      </Offcanvas>
    </div>
  );
}
