//States and methods related to playlist management are inside the hook.

import { useState } from "react";

function usePlaylistManager() {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistId, setPlaylistId] = useState(null);

  // Adds a new track to the playlist but prevents adding the same track twice.
  // const addTrack = (track) => {
  //   if (!playlistTracks.some((t) => t.id === track.id)) {
  //     setPlaylistTracks((prev) => [...prev, track]);
  //   }
  // };

  const addTrack = (track) => {
    setPlaylistTracks((prev) => {
      if (!prev.some((t) => t.id === track.id)) {
        return [...prev, track];
      }
      return prev;
    });
  };

  // Used to remove a track from the playlist that the user is currently creating or editing.
  const removeTrack = (trackId) => {
    setPlaylistTracks((prev) => prev.filter((t) => t.id !== trackId));
  };

  // Used to clear (reset) the newly created playlist after the user saves it (after sending it to Spotify and completing the process).
  const reset = () => {
    setPlaylistTracks([]);
    setPlaylistName("");
    setPlaylistId(null);
  };

  return {
    playlistTracks,
    playlistName,
    playlistId,
    setPlaylistName,
    setPlaylistId,
    setPlaylistTracks,
    addTrack,
    removeTrack,
    reset,
  };
}

export default usePlaylistManager;
