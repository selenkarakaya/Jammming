import React, { useState, useEffect } from "react";
import NewPlaylistTrack from "./NewPlaylistTrack";
import SavePlaylistButton from "./SavePlaylistButton";

function NewPlaylist({
  playlistTracks,
  removeTrackFromPlaylist,
  playlistName,
  setPlaylistName,
  tempMessage,
  onReset,
  playlistId,
  onSave,
  onUpdate,
}) {
  return (
    <section
      className="bg-black/10 p-4 rounded-xl shadow-md"
      aria-labelledby="playlist-section-title"
    >
      <h2
        id="playlist-section-title"
        className="text-center text-lg font-semibold mb-2"
      >
        Playlist Editor
      </h2>

      <form>
        <div className="mb-4">
          <label
            htmlFor="playlist-name"
            className="block text-sm font-medium text-white sr-only"
          >
            Playlist Name
          </label>
          <input
            id="playlist-name"
            type="text"
            value={playlistName}
            placeholder="Enter playlist name"
            aria-label="Playlist name"
            onChange={(e) => setPlaylistName(e.target.value)}
            className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>

      <ul role="list" aria-label="Playlist tracks" className="space-y-2 mb-4">
        {playlistTracks.map((playlistTrack) => (
          <li key={playlistTrack.id}>
            <NewPlaylistTrack
              playlistTrack={playlistTrack}
              onRemove={removeTrackFromPlaylist}
            />
          </li>
        ))}
      </ul>

      <SavePlaylistButton
        playlistTracks={playlistTracks}
        playlistName={playlistName}
        playlistId={playlistId}
        onReset={onReset}
        //
        onSave={onSave}
        onUpdate={onUpdate}
      />
      {tempMessage && (
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
          <div className="bg-black/80 text-white px-6 py-3 rounded-xl shadow-lg text-lg animate-fadeInOut">
            {tempMessage}
          </div>
        </div>
      )}
    </section>
  );
}

export default NewPlaylist;
