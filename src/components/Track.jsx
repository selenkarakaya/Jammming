import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

function Track({ track, addTrackToPlaylist }) {
  const handleClick = () => {
    addTrackToPlaylist(track);
  };
  return (
    <>
      <div className="flex justify-between border-b-4 border-b-cyan-700 mb-4 text-amber-50">
        <div>
          <h4 className="mb-1">{track.name}</h4>
          <p className="text-sm mb-1">
            {track.artist} | {track.album}
          </p>
        </div>
        <button
          onClick={handleClick}
          type="submit"
          aria-label="Add track to playlist"
        >
          <IoAddCircleOutline />
        </button>
      </div>
    </>
  );
}

export default Track;
