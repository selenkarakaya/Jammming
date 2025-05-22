import React from "react";
import PlaylistTrack from "./PlaylistTrack";
import SavePlaylistButton from "./SavePlaylistButton";

function Playlist() {
  return (
    <div>
      <h1>Displays selected songs to be saved. right side on page</h1>
      <PlaylistTrack />
      <SavePlaylistButton />
    </div>
  );
}

export default Playlist;
