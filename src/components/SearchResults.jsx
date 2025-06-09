import React from "react";
import Track from "./Track";

function SearchResults({ tracks, addTrackToPlaylist }) {
  return (
    <div className="bg-white/15 p-4 rounded-xl shadow-md">
      <h1 className="text-center">RESULTS</h1>
      {tracks.map((track, index) => (
        <Track
          track={track}
          key={index}
          addTrackToPlaylist={addTrackToPlaylist}
        />
      ))}
    </div>
  );
}

export default SearchResults;
