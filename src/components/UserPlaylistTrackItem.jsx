import React from "react";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { AiOutlineSpotify } from "react-icons/ai";

function UserPlaylistTrackItem({ track, onRemove }) {
  return (
    <li className="flex my-3 justify-between items-center border-b-2 border-b-cyan-800">
      <div className="flex flex-col mb-3">
        <p>
          <strong>{track.name}</strong> by {track.artist}
        </p>
        <p>
          <em>Album:</em> {track.album}
        </p>
      </div>
      <div className="flex gap-2">
        <a
          href={track.external_urls?.spotify}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineSpotify className="text-2xl hover:scale-105 text-green-900" />
        </a>
        <button onClick={onRemove}>
          <IoRemoveCircleOutline className="text-2xl hover:scale-105 hover:text-red-800" />
        </button>
      </div>
    </li>
  );
}

export default UserPlaylistTrackItem;
