import React, { useEffect } from "react";
import Spotify from "../utils/Spotify";
import { toast } from "react-toastify";

function Login() {
  useEffect(() => {
    const logoutReason = localStorage.getItem("logout_reason");
    if (logoutReason) {
      toast.info(logoutReason);
      localStorage.removeItem("logout_reason");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={Spotify.redirectToSpotify}
        className="savePlaylistButton"
        aria-label="Log in to your Spotify account"
      >
        Log In with Spotify
      </button>
    </div>
  );
}

export default Login;
