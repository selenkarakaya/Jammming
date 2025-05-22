import React from "react";

function PlaylistTrack({ playlistTrack }) {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h4>{playlistTrack.name}</h4>
          <p>
            {playlistTrack.artist} | {playlistTrack.album}
          </p>
        </div>
        <button>delete</button>
      </div>
    </>
  );
}

export default PlaylistTrack;
