import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../components/Home";
import Spotify from "../utils/Spotify";
import "@testing-library/jest-dom";

// Single Spotify mock including getUserPlaylists
jest.mock("../utils/Spotify", () => ({
  getPlaylistTracks: jest.fn(() => Promise.resolve([])),
  savePlaylist: jest.fn(() => Promise.resolve()),
  getUserPlaylists: jest.fn(() => Promise.resolve([])),
}));

// Mock child components
jest.mock("../components/Login", () => () => <div>Mocked Login</div>);
jest.mock("../components/SearchBar", () => () => <div>Mocked SearchBar</div>);
jest.mock("../components/SearchResults", () => () => (
  <div>Mocked SearchResults</div>
));
jest.mock("../components/NewPlaylist", () => () => (
  <div>Mocked NewPlaylist</div>
));
jest.mock("../components/UserPlaylists", () => () => (
  <div>Mocked UserPlaylists</div>
));
beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  console.error.mockRestore();
  jest.clearAllMocks();
});

// Helper for token setup
const setToken = (val) => {
  if (val) {
    localStorage.setItem("spotify_access_token", val);
  } else {
    localStorage.removeItem("spotify_access_token");
  }
};

describe("Home component", () => {
  beforeEach(() => {
    setToken(null); // clear token
    jest.clearAllMocks();
  });

  test("shows Login when token is missing", async () => {
    render(<Home />);
    expect(await screen.findByText("Mocked Login")).toBeInTheDocument();
  });

  test("renders main app when token is present", async () => {
    setToken("dummy_token");
    Spotify.getUserPlaylists.mockResolvedValueOnce([]);

    render(<Home />);

    expect(await screen.findByText("Mocked SearchBar")).toBeInTheDocument();
    expect(screen.getByText("Mocked SearchResults")).toBeInTheDocument();
    expect(screen.getByText("Mocked NewPlaylist")).toBeInTheDocument();
    expect(screen.getByText("Mocked UserPlaylists")).toBeInTheDocument();

    expect(Spotify.getUserPlaylists).toHaveBeenCalledTimes(1);
  });
});
