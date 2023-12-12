import React, { useEffect } from 'react';
import { app } from "../firebase.js";
import { getAuth, signOut } from "firebase/auth";

export default function Dashboard() {
  const auth = getAuth(app);

  function logOut() {
    signOut(auth).then(() => {
      //navigate to home page
     console.log("signed out");
    }).catch((error) => {
      console.log(error);
    });
  }

  
  return (
    <div>Dashboard
    <button onClick={logOut}>Sign Out</button></div>
  )
}
