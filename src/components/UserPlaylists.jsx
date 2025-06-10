import React, { useState, useEffect } from "react";
import Spotify from "../utils/Spotify";
import UserPlaylistTracks from "./UserPlaylistTracks";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { RiEyeCloseFill } from "react-icons/ri";

function UserPlaylists({
  playlists,
  onEdit,
  updatedPlaylist,
  updatedPlaylistName,
}) {
  const [error, setError] = useState(null);
  const [playlistName, setPlaylistName] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTracks = async () => {
      if (!selectedPlaylistId) return;

      if (updatedPlaylist && updatedPlaylistName) {
        setTracks(updatedPlaylist);
        setPlaylistName(updatedPlaylistName);
        return; // ✅ API çağrısını atla çünkü güncel veri zaten geldi
      }

      try {
        const tracks = await Spotify.getPlaylistTracks(selectedPlaylistId);
        setTracks(tracks);
        const playlist = playlists.find(
          (p) => p.playlistId === selectedPlaylistId
        );
        if (playlist) setPlaylistName(playlist.name);
      } catch (err) {
        setError("Failed to load tracks.");
        console.error(err);
      }
    };

    fetchTracks();
  }, [selectedPlaylistId, updatedPlaylist, updatedPlaylistName]);

  const handleRemoveTrack = async (trackId) => {
    try {
      if (!selectedPlaylistId || !trackId) {
        console.warn("Playlist ID or Track ID is missing.");
        return;
      }
      await Spotify.removeTrackFromPlaylist(selectedPlaylistId, trackId);

      const updatedTracks = await Spotify.getPlaylistTracks(selectedPlaylistId);
      setTracks(updatedTracks);
      toast.success("Song successfully removed from the playlist!");
    } catch (error) {
      console.error("An error occurred while deleting the song:", error);
      toast.error("Please, try again!");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white/5 rounded-xl shadow-md w-1/2 py-10 flex flex-col justify-center items-center">
      <h2 className="text-3xl text-center border-dashed border-b-2 border-b-fuchsia-900 w-full mb-4">
        My Playlists
      </h2>

      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li
              key={playlist.playlistId}
              style={{ cursor: "pointer" }}
              className="text-lg p-2 hover:bg-black/10 hover:rounded-2xl hover:scale-110"
              onClick={() => {
                setSelectedPlaylistId(playlist.playlistId);
                setPlaylistName(
                  updatedPlaylist &&
                    updatedPlaylistName &&
                    playlist.playlistId === selectedPlaylistId
                    ? updatedPlaylistName
                    : playlist.name
                );

                setShowModal(true);
              }}
            >
              {updatedPlaylist &&
              updatedPlaylistName &&
              playlist.playlistId === selectedPlaylistId
                ? updatedPlaylistName
                : playlist.name}
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div
          className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white p-5 rounded-lg w-3/4  max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-center font-extrabold text-cyan-900">
              {playlistName}
            </h3>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  onEdit(
                    playlists.find((p) => p.playlistId === selectedPlaylistId)
                      ?.name || "",
                    tracks,
                    selectedPlaylistId
                  );
                  setShowModal(false);
                }}
              >
                <CiEdit className="text-2xl hover:scale-105 hover:text-cyan-900" />
              </button>
              <button onClick={() => setShowModal(false)}>
                <RiEyeCloseFill className="text-2xl hover:scale-105 hover:text-red-800" />
              </button>
            </div>
            {tracks.length === 0 ? (
              <p>No tracks found.</p>
            ) : (
              <ul>
                {tracks.map((track) => (
                  <UserPlaylistTracks
                    key={track.id}
                    track={track}
                    handleRemoveTrack={handleRemoveTrack}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserPlaylists;

/*
Since getUserPlaylists is asynchronous, you can't make the useEffect callback itself async, because React doesn't expect it to return a Promise.
That's why we define an async function inside the effect and call it immediately.

*/
