import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiOutlineSpotify } from "react-icons/ai";

function SearchResultsTrack({ track, addTrackToPlaylist }) {
  const handleClick = () => {
    addTrackToPlaylist(track);
  };

  return (
    <div className="flex justify-between items-center border-b-4 border-b-cyan-700 mb-4 text-amber-50">
      <div>
        <h4 className="mb-1">{track.name}</h4>
        <p className="text-sm mb-1">
          {track.artist} | {track.album}
        </p>
      </div>
      <div className="flex gap-2 ">
        {track.preview_url ? (
          <audio controls src={track.preview_url}></audio>
        ) : (
          <a
            href={track.external_urls?.spotify || "#"}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineSpotify className="text-2xl text-green-900" />
          </a>
        )}
        <button
          onClick={handleClick}
          type="button"
          aria-label="Add track to playlist"
        >
          <IoAddCircleOutline className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default SearchResultsTrack;
