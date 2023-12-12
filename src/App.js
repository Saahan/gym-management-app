import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import { app } from "./firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Protected from "./components/Protected.js";

export default function App() {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        console.log(user); //do a get request here to get user data from database
      } else {
        setIsAuthenticated(false);
      }
    }),
    []
  );

  return (
    <BrowserRouter>
      {isAuthenticated !== null && (
        <Routes>
          <Route index element={<Main />} />
          <Route path="/signup" element={<SignUp />} />

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
