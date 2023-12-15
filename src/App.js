import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import { app } from "./firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Protected from "./components/Protected.js";
import ReactLoading from "react-loading";
import AccountCreated from "./pages/AccountCreated.js";

export default function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthenticated(true);
      console.log("app useffect run:", user);
    } else {
      setIsAuthenticated(false);
    }
  });

  return (
    <BrowserRouter>
      {isAuthenticated === null && (
        <ReactLoading
          type="spin"
          color="rgb(209, 100, 50)"
          className="loading"
        />
      )}
      {isAuthenticated !== null && (
        <Routes>
          <Route index element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
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
              <Protected isAuthenticated={isAuthenticated}>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
      )}
    </BrowserRouter>
  );
}
