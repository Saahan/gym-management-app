import React, { useEffect, useState } from "react";
import { app } from "../firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/dashboard.css";
import axios from "axios";
import UserDashboard from "../components/UserDashboard.js";
import AdminDashboard from "../components/AdminDashboard.js";
import MemberDashboard from "../components/MemberDashboard.js";
import ReactLoading from "react-loading";

export default function Dashboard() {
  const auth = getAuth(app);
  const [privileges, setPriveleges] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(
    onAuthStateChanged(auth, (user) => {
      console.log("Dashboard useffect run", user);
      axios
        .get("http://localhost:5000/api/userdetails", {
          params: {
            user: user.uid,
          },
        })
        .then((res) => {
          //console.log(res.data);
          setPriveleges(res.data[0].accountType);
          setUserData(res.data[0]);
        }).catch((err) => {console.log(err)});
    }),
    []
  );

  switch (privileges) {
    case "user":
      return <UserDashboard userData = {userData}/>;

    case "member":
      return <MemberDashboard />;

    case "admin":
      return <AdminDashboard />;

    default:
      return (
        <ReactLoading
          type="spin"
          color="rgb(209, 100, 50)"
          className="loading"
        />
      );
  }
}
