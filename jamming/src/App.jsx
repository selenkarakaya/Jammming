// import React, { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "./App.css";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Spotify from "./utils/Spotify";
// import SearchBar from "./components/SearchBar";
// import SearchResults from "./components/SearchResults";
// import Playlist from "./components/Playlist";
// import Callback from "./utils/Callback";
// import Login from "./components/Login";

// function App() {
//   const [searchResults, setSearchResults] = useState([]);
//   const token = localStorage.getItem("spotify_access_token");

//   async function handleSearch(term) {
//     try {
//       const results = await Spotify.search(term);
//       setSearchResults(results);
//     } catch (error) {
//       toast.error("Spotify araması başarısız!");
//       console.error(error);
//     }
//   }

//   return (
//     <Router>
//       <Routes>
//         {/* Login ve Callback sayfaları her zaman erişilebilir */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/callback" element={<Callback />} />

//         {/* Eğer token yoksa, anasayfaya gitmeye çalışınca login'e yönlendir */}
//         <Route
//           path="/"
//           element={
//             token ? (
//               <>
//                 <div className="app-layout">
//                   <div className="search-wrapper">
//                     <SearchBar onSearch={handleSearch} />
//                   </div>

//                   <div className="bottom-row">
//                     <SearchResults tracks={searchResults} />
//                     <Playlist />
//                   </div>
//                 </div>
//                 {/* <SearchBar onSearch={handleSearch} />
//                 <SearchResults tracks={searchResults} />
//                 <Playlist /> */}
//               </>
//             ) : (
//               <Navigate to="/login" replace />
//             )
//           }
//         />
//       </Routes>

//       <ToastContainer />
//     </Router>
//   );
// }

// export default App;

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
import Callback from "./utils/Callback";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("spotify_access_token")
  );

  // Callback'den dönerken token değişmiş olabilir, bu yüzden dinle
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
      toast.error("Spotify araması başarısız!");
      console.error(error);
    }
  }

  const addTrackToPlaylist = (track) => {
    console.log(`bu track componentinden geliyor ${JSON.stringify(track)}`);
    // Aynı track daha önce eklenmişse tekrar ekleme
    if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
      console.log("bu ekli zaten");
    } else {
      setPlaylistTracks((prev) => [...prev, track]);
    }
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
                  <Playlist playlistTracks={playlistTracks} />
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
