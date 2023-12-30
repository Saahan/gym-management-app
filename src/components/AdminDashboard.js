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

export default function AdminDashboard(props) {
  const storage = getStorage();
  const [view, setView] = useState("Profile");

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

  function refresh(e) {
    setView("");
    setTimeout(() => {
      setView(e);
    }, 1000);
  }

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
            className={view === "Members" ? "active" : undefined}
            onClick={selectView}
          >
            Members
          </div>
          <div
            className={view === "Add Members" ? "active" : undefined}
            onClick={selectView}
          >
            Add Members
          </div>
          <div
            className={view === "Create Bills" ? "active" : undefined}
            onClick={selectView}
          >
            Create Bills
          </div>
          <div
            className={view === "Diet" ? "active" : undefined}
            onClick={selectView}
          >
            Diet
          </div>
          <div
            className={view === "Store Management" ? "active" : undefined}
            onClick={selectView}
          >
            Store Management
          </div>
        </div>
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
    </div>
  );
}
