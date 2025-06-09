import React, { useState, useEffect } from "react";

function UserPlaylistTracks({ track }) {
  return (
    <li key={track.id} style={{ marginBottom: "15px" }}>
      <strong>{track.name}</strong> by {track.artist}
      <br />
      <em>Album:</em> {track.album}
      <br />
      {track.preview_url && (
        <audio controls src={track.preview_url}>
          Your browser does not support the audio element.
        </audio>
      )}
      <br />
      <a
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open in Spotify
      </a>
      <hr />
    </li>
  );
}

export default UserPlaylistTracks;
