import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
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
jest.mock("../components/SearchBar", () => (props) => (
  <button data-testid="search-button" onClick={() => props.onSearch("beatles")}>
    Mocked SearchBar
  </button>
));

jest.mock("../components/SearchResults", () => () => (
  <div>Mocked SearchResults</div>
));

jest.mock("../components/NewPlaylist", () => (props) => (
  <div>
    Mocked NewPlaylist
    <button
      data-testid="save-button"
      onClick={() => props.onSave([{ id: "1", name: "My Playlist" }])}
    >
      Save Playlist
    </button>
    {props.tempMessage && <div>{props.tempMessage}</div>}
  </div>
));

jest.mock("../components/UserPlaylists", () => (props) => (
  <div>
    Mocked UserPlaylists
    <div data-testid="playlist-count">{props.playlists.length}</div>
  </div>
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

  test("temp message", async () => {
    setToken("dummy_token");

    Spotify.getUserPlaylists.mockRejectedValueOnce(new Error("Failed"));

    render(<Home />);

    expect(
      await screen.findByText("Failed to load playlists")
    ).toBeInTheDocument();
  });

  test("handleSearch calls Spotify.search and sets results", async () => {
    setToken("dummy_token");

    const fakeResults = [{ id: "1", name: "Song 1" }];
    Spotify.search = jest.fn().mockResolvedValueOnce(fakeResults);

    render(<Home />);

    fireEvent.click(screen.getByTestId("search-button"));

    await waitFor(() => {
      expect(Spotify.search).toHaveBeenCalledWith("beatles");
    });
  });

  test("handleSearch shows error message when Spotify.search fails", async () => {
    setToken("dummy_token");

    Spotify.search = jest
      .fn()
      .mockRejectedValueOnce(new Error("Search failed"));

    render(<Home />);

    fireEvent.click(screen.getByTestId("search-button"));

    expect(
      await screen.findByText("Spotify search failed!")
    ).toBeInTheDocument();
  });

  test("onSave updates playlists and resets state", async () => {
    setToken("dummy_token");

    Spotify.getUserPlaylists.mockResolvedValueOnce([]);

    render(<Home />);

    expect(screen.getByText("Mocked UserPlaylists")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("save-button"));

    await waitFor(() => {
      expect(screen.getByTestId("playlist-count").textContent).toBe("1");
    });
  });
});
