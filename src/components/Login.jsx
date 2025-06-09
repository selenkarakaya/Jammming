import React from "react";
import Spotify from "../utils/Spotify";

function Login() {
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
