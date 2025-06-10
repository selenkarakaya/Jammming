import React, { useState, useEffect } from "react";
import Spotify from "../utils/Spotify";
import UserPlaylistTracks from "./UserPlaylistTracks";
import { toast } from "react-toastify";
function UserPlaylists({ onEdit }) {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const playlists = await Spotify.getUserPlaylists();
        setPlaylists(playlists);
      } catch (err) {
        setError("Failed to load playlists.");
        console.error(err);
      }
    };

    fetchUserPlaylists();
  }, []);

  useEffect(() => {
    const fetchTracks = async () => {
      if (!selectedPlaylistId) return;
      try {
        const tracks = await Spotify.getPlaylistTracks(selectedPlaylistId);
        setTracks(tracks);
      } catch (err) {
        setError("Failed to load tracks.");
        console.error(err);
      }
    };

    fetchTracks();
  }, [selectedPlaylistId]);

  const handleRemoveTrack = async (trackId) => {
    try {
      console.log("Silinecek track ID:", trackId);
      console.log("Seçilen playlist ID:", selectedPlaylistId);

      if (!selectedPlaylistId || !trackId) {
        console.warn("Playlist ID veya Track ID eksik.");
        return;
      }

      await Spotify.removeTrackFromPlaylist(selectedPlaylistId, trackId);

      const updatedTracks = await Spotify.getPlaylistTracks(selectedPlaylistId);
      setTracks(updatedTracks);

      toast.success("Şarkı playlistten silindi!");
    } catch (error) {
      console.error("Şarkı silinirken hata oluştu:", error);
      toast.error("Şarkı silinirken bir hata oluştu.");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Local Playlists</h2>
      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li
              key={playlist.playlistId}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedPlaylistId(playlist.playlistId);
                setShowModal(true);
              }}
            >
              {playlist.name} {playlist.playlistId}
            </li>
          ))}
        </ul>
      )}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Playlist Tracks</h3>
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
              Edit
            </button>

            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

//   ))}
export default UserPlaylists;

/*
Since getUserPlaylists is asynchronous, you can't make the useEffect callback itself async, because React doesn't expect it to return a Promise.
That's why we define an async function inside the effect and call it immediately.

*/
