import React, { useState } from "react";

function SavePlaylistButton() {
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

  const handleSave = () => {
    // This is where you'd send your playlist data to Spotify's API
    console.log("Saving playlist to Spotify...");

    // Example:
    // fetch("/api/save", {
    //   method: "POST",
    //   body: JSON.stringify(selectedTracks)
    // })

    // Optionally, show a toast or notification
    // toast.success("Playlist saved to Spotify!");
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
