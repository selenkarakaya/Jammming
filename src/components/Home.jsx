import React, { useState, useEffect } from "react";
import Spotify from "../utils/Spotify";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import NewPlaylist from "./NewPlaylist";
import UserPlaylists from "./UserPlaylists";

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistId, setPlaylistId] = useState(null);
  const [tempMessage, setTempMessage] = useState(null);
  const [playlists, setPlaylists] = useState([]);

  const showTempMessage = (msg, duration = 2000) => {
    setTempMessage(msg);
    setTimeout(() => {
      setTempMessage(null);
    }, duration);
  };
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

  function onSave(newItem) {
    setPlaylists(newItem);
  }

  const handleSearch = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results);
    } catch (error) {
      showTempMessage("Spotify search failed!");
      console.error(error);
    }
  };

  const addTrackToPlaylist = (track) => {
    // Avoid adding duplicate tracks
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      showTempMessage("This track is already added.");
    } else {
      setPlaylistTracks((prev) => [...prev, track]);
    }
  };

  const removeTrackFromPlaylist = (playlistTrack) => {
    setPlaylistTracks((prev) =>
      prev.filter((track) => track.id !== playlistTrack.id)
    );
  };

  const resetAfterSave = () => {
    setPlaylistTracks([]);
    setPlaylistName("");
  };
  return (
    <div className="app-layout">
      <div className="search-wrapper">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="bottom-row">
        <SearchResults
          tracks={searchResults}
          addTrackToPlaylist={addTrackToPlaylist}
        />
        <NewPlaylist
          playlistTracks={playlistTracks}
          removeTrackFromPlaylist={removeTrackFromPlaylist}
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          tempMessage={tempMessage}
          onReset={resetAfterSave}
          playlistId={playlistId}
          //
          onSave={onSave}
        />
      </div>
      <UserPlaylists
        playlists={playlists}
        onEdit={(name, tracks, id) => {
          setPlaylistName(name);
          setPlaylistTracks(tracks);
          setPlaylistId(id);
        }}
      />
    </div>
  );
}

export default Home;
