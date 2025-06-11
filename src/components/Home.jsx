import React, { useState, useEffect } from "react";
import Spotify from "../utils/Spotify";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import NewPlaylist from "./NewPlaylist";
import UserPlaylists from "./UserPlaylists";
//States and methods related to playlist management are inside the hook.
import usePlaylistManager from "../hooks/usePlaylistManager";
import Login from "./Login";

function Home() {
  const {
    playlistTracks,
    playlistName,
    playlistId,
    setPlaylistName,
    setPlaylistId,
    setPlaylistTracks,
    addTrack,
    removeTrack,
    reset,
  } = usePlaylistManager();

  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [updatedPlaylist, setUpdatedPlaylist] = useState();
  const [updatedPlaylistName, setUpdatedPlaylistName] = useState();
  const [updatedPlaylistId, setUpdatedPlaylistId] = useState(null);
  const [tempMessage, setTempMessage] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("spotify_access_token")
  );

  // Listen for token changes when returning from callback
  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]); // burayi sonradan ekldim

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const userPlaylists = await Spotify.getUserPlaylists();
        setPlaylists(userPlaylists);
      } catch (err) {
        setTempMessage("Failed to load playlists");
        console.error(err);
      }
    };

    fetchUserPlaylists();
  }, []);

  const showTempMessage = (msg, duration = 2000) => {
    setTempMessage(msg);
    setTimeout(() => setTempMessage(null), duration);
  };

  const handleSearch = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (err) {
      showTempMessage("Spotify search failed!");
      console.error(err);
    }
  };

  // Update playlists after a new playlist is saved
  const onSave = (newPlaylists) => {
    setPlaylists(newPlaylists);
    reset();
    setSearchResults([]);
  };

  // This is called when a playlist is updated
  const onUpdate = (updatedTracks, updatedName, updatedId) => {
    setUpdatedPlaylist(updatedTracks);
    setUpdatedPlaylistName(updatedName);
    setUpdatedPlaylistId(updatedId);

    setTimeout(() => {
      setUpdatedPlaylistId(null);
      setUpdatedPlaylist(null);
      setUpdatedPlaylistName(null);
    }, 2000);
    setSearchResults([]);
  };

  // Update state when editing is triggered from UserPlaylists
  const onEdit = (name, tracks, id) => {
    setPlaylistName(name);
    setPlaylistId(id);
    setPlaylistTracks(tracks);
  };
  const logout = () => {
    // 1. Token'ları temizle
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_refresh_token");

    // 3. Uygulama login sayfasına yönlendir
    // (Bu, logout sayfasından geri dönünce yapılmalı)
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };
  return token ? (
    <div className="app-layout">
      <button onClick={logout}>Log out</button>

      <div className="search-wrapper">
        <SearchBar onSearch={handleSearch} setTempMessage={setTempMessage} />
      </div>

      <div className="bottom-row">
        <SearchResults
          tracks={searchResults.filter(
            (track) => !playlistTracks.some((t) => t.id === track.id)
          )}
          addTrackToPlaylist={addTrack}
        />

        <NewPlaylist
          playlistTracks={playlistTracks}
          removeTrackFromPlaylist={removeTrack}
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          tempMessage={tempMessage}
          onReset={reset}
          playlistId={playlistId}
          onSave={onSave}
          onUpdate={onUpdate}
        />
      </div>

      <UserPlaylists
        playlists={playlists}
        updatedPlaylist={updatedPlaylist}
        updatedPlaylistName={updatedPlaylistName}
        updatedPlaylistId={updatedPlaylistId}
        onEdit={onEdit}
        setTempMessage={setTempMessage}
      />
    </div>
  ) : (
    <Login />
  );
}

export default Home;
