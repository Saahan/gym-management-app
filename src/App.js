import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import SignUp from "./pages/SignUp";
import { app } from "./firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Protected from "./components/Protected.js";
import ReactLoading from "react-loading";
import AccountCreated from "./pages/AccountCreated.js";
import ForgotPassword from "./pages/ForgotPassword.js";

export default function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [privileges, setPriveleges] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    //firebase authentication
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); //authenticate user if he/she is loggin in
        setPriveleges("");
        console.log("app useffect run:", user);
        axios
          .get("http://localhost:5000/api/userdetails", {
            params: {
              user: user.uid,
            },
          })
          .then((res) => {
            //console.log(res.data);
            setPriveleges(res.data[0].accountType); //set priveleges as per the type of account, which can be changed by the admin
            setUserData(res.data[0]); //set user data, which consists of diet details and personal details.
            //console.log("env file", process.env);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setIsAuthenticated(false);
      }
    });
  }, [auth]);

  return (
    <BrowserRouter>
      {isAuthenticated === null && (
        <ReactLoading
          type="bubbles"
          color="rgb(209, 100, 50)"
          className="loading"
        />
      )}
      {isAuthenticated !== null && (
        <Routes>
          <Route index element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/signup-successful"
            element={
              <Protected isAuthenticated={isAuthenticated}>
                <AccountCreated />
              </Protected>
            }
          />

          <Route
            path="/dashboard"
            element={
              //the Protected component only renders its child, the dashboard if the user is authenticated
              <Protected isAuthenticated={isAuthenticated}>
                <Dashboard privileges={privileges} userData={userData} />
              </Protected>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}
