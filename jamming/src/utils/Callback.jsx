import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getTokenFromCode } from "./spotifyAuth";

const clientId = "21b64e14c1a9424d92b5cb31a803a393";
const redirectUri = "http://127.0.0.1:5173/callback";

function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    async function fetchToken() {
      const code = searchParams.get("code");
      console.log("Callback'a gelen code:", code);
      console.log("Code verifier:", localStorage.getItem("code_verifier"));

      if (!code) {
        toast.error("Kod bulunamadı. Spotify'dan yönlendirme hatası.");
        navigate("/");
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

          toast.success("Spotify bağlantısı başarılı!");
          navigate("/");
        } else {
          toast.error("Spotify token alınamadı.");
          navigate("/");
        }
      } catch (error) {
        toast.error("Token alma hatası!");
        console.error("Token alma hatası:", error);
        navigate("/");
      }
    }

    fetchToken();
  }, [navigate, searchParams]);

  return <div>Spotify'a bağlanılıyor...</div>;
}

export default Callback;
