import React from "react";
import SearchResultsTrack from "./SearchResultsTrack";

function SearchResults({ tracks, addTrackToPlaylist }) {
  return (
    <div className="bg-white/15 p-4 rounded-xl shadow-md">
      <h1 className="text-center text-lg font-semibold mb-2">Results</h1>
      {tracks.map((track, index) => (
        <SearchResultsTrack
          track={track}
          key={track.id}
          addTrackToPlaylist={addTrackToPlaylist}
        />
      ))}
    </div>
  );
}

export default SearchResults;
