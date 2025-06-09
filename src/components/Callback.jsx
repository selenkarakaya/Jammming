import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getTokenFromCode } from "../utils/spotifyAuth";

const clientId = "21b64e14c1a9424d92b5cb31a803a393";
// const redirectUri =
//   window.location.hostname === "localhost"
//     ? "http://127.0.0.1:5173/callback"
//     : "https://spotifyapijamming.netlify.app/callback";

const redirectUri =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:5173/callback"
    : "https://spotifyapijamming.netlify.app/callback";

function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchToken() {
      const code = searchParams.get("code");
      console.log("Code received in callback:", code);
      console.log("Code verifier:", localStorage.getItem("code_verifier"));

      if (!code) {
        navigate("/login");
        return;
      }

      try {
        const tokenData = await getTokenFromCode(code, clientId, redirectUri);

        if (tokenData.access_token) {
          localStorage.setItem("spotify_access_token", tokenData.access_token);
          localStorage.setItem(
            "spotify_refresh_token",
            tokenData.refresh_token
          );
          const expiryTime = new Date().getTime() + tokenData.expires_in * 1000;
          localStorage.setItem("spotify_token_expiry", expiryTime);
          toast.success("Successfully connected to Spotify!");
          setTimeout(() => {
            window.location.href = "/";
          }, 300);
        } else {
          toast.error("Failed to retrieve Spotify token.");
          navigate("/");
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
        navigate("/");
      }
    }

    fetchToken();
  }, [navigate, searchParams]);

  return <div>Connecting to Spotify...</div>;
}

export default Callback;
