import React from "react";
import { IoRemoveCircleOutline } from "react-icons/io5";

function NewPlaylistTrack({ playlistTrack, onRemove }) {
  return (
    <div className="flex justify-between border-b-4 border-b-indigo-100 mb-4 text-amber-50">
      <div>
        <h4 className="mb-1">{playlistTrack.name}</h4>
        <p className="text-sm mb-1">
          {playlistTrack.artist} | {playlistTrack.album}
        </p>
      </div>
      <button
        onClick={() => {
          onRemove(playlistTrack.id);
        }}
        aria-label={`Remove ${playlistTrack.name} from playlist`}
        className="text-2xl"
      >
        <IoRemoveCircleOutline />
      </button>
    </div>
  );
}

export default NewPlaylistTrack;
