import React, { useState } from "react";
import PlaylistTrack from "./PlaylistTrack";
import SavePlaylistButton from "./SavePlaylistButton";

function Playlist({ playlistTracks, removeTrackFromPlaylist }) {
  const [playlistName, setPlaylistName] = useState("My Awesome Playlist");
  return (
    <div>
      <input
        type="text"
        value={playlistName}
        placeholder="playlist name"
        onChange={(e) => setPlaylistName(e.target.value)}
      />
      {playlistTracks.map((playlistTrack) => (
        <PlaylistTrack
          playlistTrack={playlistTrack}
          key={playlistTrack.id}
          onRemove={removeTrackFromPlaylist}
        />
      ))}

      <SavePlaylistButton
        playlistTracks={playlistTracks}
        playlistName={playlistName}
      />
    </div>
  );
}

export default Playlist;
