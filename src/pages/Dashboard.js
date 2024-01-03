import React from "react";
import "../styles/dashboard.css";
import UserDashboard from "../components/UserDashboard.js";
import AdminDashboard from "../components/AdminDashboard.js";
import MemberDashboard from "../components/MemberDashboard.js";
import ReactLoading from "react-loading";

export default function Dashboard(props) {
  //render the type of dashboard according to user priveleges, using a switch statement.
  switch (props.privileges) {
    case "user":
      return <UserDashboard userData={props.userData} />;

    case "member":
      return <MemberDashboard userData={props.userData} />;

    case "admin":
      return <AdminDashboard userData={props.userData} />;

    default:
      return (
        <ReactLoading
          type="bubbles"
          color="rgb(209, 100, 50)"
          className="loading"
        />
      );
  }
}
