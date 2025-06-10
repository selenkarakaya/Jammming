import React, { useState } from "react";
import { toast } from "react-toastify";
import LoadingScreen from "./LoadingScreen";
import RippleButton from "./RippleButton";
import { savePlaylistToSpotify } from "../utils/savePlaylistToSpotify";

function SavePlaylistButton({
  playlistTracks,
  playlistName,
  onReset,
  playlistId,
  onSave,
  onUpdate,
}) {
  const [isSaving, setIsSaving] = useState(false);

  const handleClick = async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      await savePlaylistToSpotify({
        name: playlistName,
        tracks: playlistTracks,
        playlistId,
        onReset,
        onSave,
        onUpdate,
      });
      toast.success(`"${playlistName}" saved to Spotify!`);
    } catch (err) {
      toast.error(err.message || "Failed to save playlist!");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {isSaving && <LoadingScreen />}
      <div className="flex justify-center">
        <RippleButton className="savePlaylistButton" onClick={handleClick}>
          SAVE TO SPOTIFY
        </RippleButton>
      </div>
    </>
  );
}

export default SavePlaylistButton;
