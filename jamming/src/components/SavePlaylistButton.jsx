import React, { useState } from "react";
import { toast } from "react-toastify";
import Spotify from "../utils/Spotify";

function SavePlaylistButton({ playlistTracks, playlistName }) {
  // Ripple effect logic
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const xInside = e.clientX - rect.left;
    const yInside = e.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x: xInside,
      y: yInside,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    // 🎵 Trigger the playlist save to Spotify
    handleSave();
  };

  const handleSave = async () => {
    if (!playlistName.trim()) {
      toast.warn("Lütfen bir playlist adı girin.");
      return;
    }

    if (playlistTracks.length === 0) {
      toast.warn("Önce birkaç şarkı ekleyin!");
      return;
    }

    const trackUris = playlistTracks.map((track) => track.uri);

    try {
      await Spotify.savePlaylist(playlistName, trackUris);
      toast.success(`"${playlistName}" Spotify'a kaydedildi!`);
    } catch (error) {
      console.error("Playlist kaydetme hatası:", error);
      toast.error("Playlist kaydedilemedi!");
    }
  };

  return (
    <div>
      Button to save/export playlist to Spotify.
      <button className="savePlaylistButton" onClick={handleClick}>
        SAVE TO SPOTIFY
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{ top: ripple.y, left: ripple.x }}
          ></span>
        ))}
      </button>
    </div>
  );
}

export default SavePlaylistButton;
