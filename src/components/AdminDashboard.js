import React, { useEffect, useState } from "react";
import NavBar from "./NavBar.js";
import "../styles/dashboard.css";
import Profile from "./Profile.js";
import CreateBills from "./CreateBills.js";
import AssignPlans from "./AssignPlans.js";
import MembersList from "./MembersList.js";
import AddMembers from "./AddMembers.js";
import SupplementStore from "./SupplementStore.js";
import ReactLoading from "react-loading";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import AdminSideBar from "./AdminSideBar.js";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function AdminDashboard(props) {
  // please see MemberDashboard.js for explanation
  const storage = getStorage();
  const [view, setView] = useState("Profile");
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

  function refresh(e) {
    setView("");
    setTimeout(() => {
      setView(e);
    }, 1000);
  }

  return (
    <div>
      <NavBar showSideBar={showSideBar} />
      <div>
        <AdminSideBar
          selectView={selectView}
          view={view}
          userData={props.userData}
          handleClose={() => {}}
          profilePicUrl={profilePicUrl}
          sideBarResponsive={"sidebar"}
        />
        <div className="main-screen">
          {view === "Profile" && <Profile userData={props.userData} />}
          {view === "Members" && <MembersList refresh={refresh} />}
          {view === "Add Members" && <AddMembers refresh={refresh} />}
          {view === "Create Bills" && <CreateBills />}
          {view === "Diet" && <AssignPlans />}
          {view === "Store Management" && <SupplementStore />}
          {view === "" && (
            <ReactLoading
              type="bubbles"
              color="rgb(209, 100, 50)"
              className="loading"
            />
          )}
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose} style={{ width: "70%" }}>
        <AdminSideBar
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
