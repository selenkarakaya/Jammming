import React from "react";
import PlaylistTrack from "./PlaylistTrack";
import SavePlaylistButton from "./SavePlaylistButton";

function Playlist({ playlistTracks }) {
  return (
    <div>
      <h1>Displays selected songs to be saved. right side on page</h1>
      {playlistTracks.map((playlistTrack, index) => (
        <PlaylistTrack playlistTrack={playlistTrack} key={playlistTrack} />
      ))}

      <SavePlaylistButton />
    </div>
  );
}

export default Playlist;
