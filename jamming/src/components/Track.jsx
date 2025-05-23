import React from "react";

function Track({ track, addTrackToPlaylist }) {
  const handleClick = () => {
    addTrackToPlaylist(track);
  };
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h4>{track.name}</h4>
          <p>
            {track.artist} | {track.album}
          </p>
        </div>
        <button onClick={handleClick}>add</button>
      </div>
    </>
  );
}

export default Track;
