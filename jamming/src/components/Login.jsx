import React from "react";
import Spotify from "../utils/Spotify";

function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Log in with Spotify</h2>
      <button
        onClick={Spotify.redirectToSpotify}
        className="savePlaylistButton"
      >
        Log In with Spotify
      </button>
    </div>
  );
}

export default Login;
