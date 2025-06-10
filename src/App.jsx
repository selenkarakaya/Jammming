import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Spotify from "./utils/Spotify";
import Callback from "./components/Callback";
import Login from "./components/Login";
import Home from "./components/Home";
import "./App.css";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("spotify_access_token")
  );

  // Listen for token changes when returning from callback
  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/"
          element={token ? <Home /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
