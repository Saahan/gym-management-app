import React, { useEffect, useState } from "react";
import NavBar from "./NavBar.js";
import "../styles/dashboard.css";
import Profile from "./Profile.js";
import Plans from "./Plans.js";
import About from "./About.js";
import Notifications from "./Notifications.js";
import Bills from "./Bills.js";
import axios from "axios";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import MemberSideBar from "./MemberSideBar.js";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function MemberDashboard(props) {
  const storage = getStorage();
  const [view, setView] = useState("Profile"); //initialize the view of the page, defaulted to "profile"
  const [dietData, setDietData] = useState(null); //initialize the state of the diet data object to null
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function showSideBar() {
    handleShow();
  }

  useEffect(() => {
    // get user diet details from database
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

  useEffect(() => {
    // set profile picture img src attribute by getting the URL from firebase storage
    getDownloadURL(ref(storage, `profile-pics/${props.userData.uid}`))
      .then((url) => {
        setProfilePicUrl(url);
      })
      .catch((error) => {
        console.log(error);
        //otherwise, set profile picture as blank

        setProfilePicUrl("/img/blank_profile.jpg");
      });
  }, [props.userData.uid, storage]);

  function selectView(e) {
    //setting view of the dashboard as per user selection
    console.log(e.target.innerHTML);
    setView(e.target.innerHTML);
  }

  function refresh(e) {
    //a refresh function which rerenders child components by executing the useeffect callback
    setView("");
    setTimeout(() => {
      setView(e);
    }, 100);
  }

  return (
    <div>
      <NavBar showSideBar={showSideBar} />
      <div>
        <MemberSideBar
          selectView={selectView}
          view={view}
          userData={props.userData}
          handleClose={() => {}}
          profilePicUrl={profilePicUrl}
          sideBarResponsive={"sidebar"}
        />
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
      <Offcanvas show={show} onHide={handleClose} style={{ width: "70%" }}>
        <MemberSideBar
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
