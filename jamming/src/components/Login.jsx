import React from "react";
import Spotify from "../utils/Spotify";

function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Spotify ile giriş yapınız</h2>
      <button
        onClick={Spotify.redirectToSpotify}
        className="savePlaylistButton"
      >
        Spotify ile Giriş Yap 2
      </button>
    </div>
  );
}

export default Login;
