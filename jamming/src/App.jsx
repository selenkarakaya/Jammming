import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Spotify from "./utils/Spotify";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";
import Callback from "./components/Callback";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const [token, setToken] = useState(
    localStorage.getItem("spotify_access_token")
  );

  // Listen for token changes when returning from callback
  useEffect(() => {
    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, []);

  async function handleSearch(term) {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      toast.error("Spotify search failed!");
      console.error(error);
    }
  }

  const addTrackToPlaylist = (track) => {
    console.log(`Track received from component: ${JSON.stringify(track)}`);
    // Avoid adding duplicate tracks
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      console.log("This track is already added.");
    } else {
      setPlaylistTracks((prev) => [...prev, track]);
    }
  };

  const removeTrackFromPlaylist = (playlistTrack) => {
    setPlaylistTracks((prev) =>
      prev.filter((track) => track.id !== playlistTrack.id)
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route
          path="/"
          element={
            token ? (
              <div className="app-layout">
                <div className="search-wrapper">
                  <SearchBar onSearch={handleSearch} />
                </div>
                <div className="bottom-row">
                  <SearchResults
                    tracks={searchResults}
                    addTrackToPlaylist={addTrackToPlaylist}
                  />
                  <Playlist
                    playlistTracks={playlistTracks}
                    removeTrackFromPlaylist={removeTrackFromPlaylist}
                  />
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
