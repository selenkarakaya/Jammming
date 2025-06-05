import React from "react";
import Track from "./Track";

function SearchResults({ tracks, addTrackToPlaylist }) {
  return (
    <div>
      <h1 className="text-center">Results</h1>
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
