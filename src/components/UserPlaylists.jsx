import React, { useState } from "react";
import UserPlaylistModal from "./UserPlaylistModal";

function UserPlaylists({
  playlists,
  onEdit,
  updatedPlaylist,
  updatedPlaylistName,
  updatedPlaylistId,
}) {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelect = (playlist) => {
    setSelectedPlaylist(playlist);
    setShowModal(true);
  };
  const isUpdatedPlaylist = selectedPlaylist?.playlistId === updatedPlaylistId;

  const modalPlaylist = isUpdatedPlaylist
    ? {
        ...selectedPlaylist,
        tracks: updatedPlaylist,
        name: updatedPlaylistName,
      }
    : selectedPlaylist;

  return (
    <div className="bg-white/5 rounded-xl shadow-md w-1/2 py-10 flex flex-col justify-center items-center">
      <h2 className="text-3xl text-center border-dashed border-b-2 border-b-fuchsia-900 w-full mb-4">
        My Playlists
      </h2>

      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <ul>
          {playlists.map((p) => (
            <li
              key={p.playlistId}
              onClick={() => handleSelect(p)}
              className="text-lg p-2 hover:bg-black/10 hover:rounded-2xl hover:scale-110 cursor-pointer"
            >
              {updatedPlaylist &&
              updatedPlaylistName &&
              p.playlistId === selectedPlaylist?.playlistId
                ? updatedPlaylistName
                : p.name}
            </li>
          ))}
        </ul>
      )}

      {showModal && selectedPlaylist && (
        <UserPlaylistModal
          playlist={modalPlaylist}
          updatedPlaylist={updatedPlaylist}
          updatedPlaylistName={updatedPlaylistName}
          onClose={() => setShowModal(false)}
          onEdit={onEdit}
        />
      )}
    </div>
  );
}

export default UserPlaylists;

/*
Since getUserPlaylists is asynchronous, you can't make the useEffect callback itself async, because React doesn't expect it to return a Promise.
That's why we define an async function inside the effect and call it immediately.

*/
