import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Playlist from "./components/Playlist";

function App() {
  return (
    <div className="app-layout">
      <div className="search-wrapper">
        <SearchBar />
      </div>

      <div className="bottom-row">
        <SearchResults />
        <Playlist />
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
