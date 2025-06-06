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
      toast.warn("Please enter a playlist name.");
      return;
    }

    if (playlistTracks.length === 0) {
      toast.warn("Add some songs first!");
      return;
    }

    const trackUris = playlistTracks.map((track) => track.uri);

    try {
      await Spotify.savePlaylist(playlistName, trackUris);
      toast.success(`"${playlistName}" has been saved to Spotify!`);
    } catch (error) {
      console.error("Error saving playlist:", error);
      toast.error("Failed to save playlist!");
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
