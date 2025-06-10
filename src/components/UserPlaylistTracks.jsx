import React from "react";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { AiOutlineSpotify } from "react-icons/ai";

function UserPlaylistTracks({ track, handleRemoveTrack }) {
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
      <a
        href={track.external_urls?.spotify}
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiOutlineSpotify className="text-2xl text-green-900" />
      </a>
      <button
        onClick={() => handleRemoveTrack(track.id)}
        aria-label={`Remove ${track.name} from playlist`}
      >
        <IoRemoveCircleOutline className="text-2xl" />
      </button>
      <hr />
    </li>
  );
}

export default UserPlaylistTracks;
