import React, { useEffect, useState } from "react";
import Spotify from "../utils/Spotify";
import UserPlaylistTrackItem from "./UserPlaylistTrackItem";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { RiEyeCloseFill } from "react-icons/ri";

function UserPlaylistModal({
  playlist,
  onClose,
  onEdit,
  updatedPlaylist,
  updatedPlaylistName,
}) {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const playlistId = playlist.playlistId;
  const name = updatedPlaylistName || playlist.name;

  useEffect(() => {
    const loadTracks = async () => {
      try {
        if (updatedPlaylist && updatedPlaylistName) {
          setTracks(updatedPlaylist);
          return;
        }
        const fetchedTracks = await Spotify.getPlaylistTracks(playlistId);
        setTracks(fetchedTracks);
      } catch (err) {
        console.error(err);
        setError("Failed to load tracks.");
      }
    };
    loadTracks();
  }, [playlistId, updatedPlaylist, updatedPlaylistName]);

  const handleRemoveTrack = async (trackId) => {
    try {
      await Spotify.removeTrackFromPlaylist(playlistId, trackId);
      const updated = await Spotify.getPlaylistTracks(playlistId);
      setTracks(updated);
      toast.success("Song removed.");
    } catch (err) {
      console.error(err);
      toast.error("Error removing track.");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white p-5 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center font-extrabold text-cyan-900">{name}</h3>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => {
              onEdit(name, tracks, playlistId);
              onClose();
            }}
            aria-label="edit playlist"
          >
            <CiEdit className="text-2xl hover:scale-105 hover:text-cyan-900" />
          </button>
          <button onClick={onClose}>
            <RiEyeCloseFill className="text-2xl hover:scale-105 hover:text-red-800" />
          </button>
        </div>
        {tracks.length === 0 ? (
          <p>No tracks found.</p>
        ) : (
          <ul>
            {tracks.map((track) => (
              <UserPlaylistTrackItem
                key={track.id}
                track={track}
                onRemove={() => handleRemoveTrack(track.id)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserPlaylistModal;
