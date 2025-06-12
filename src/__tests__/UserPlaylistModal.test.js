import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserPlaylistModal from "../components/UserPlaylistModal";
import "@testing-library/jest-dom";
import { act, waitFor } from "@testing-library/react";

const mockOnClose = jest.fn();
const mockOnEdit = jest.fn();

const mockPlaylist = {
  playlistId: "123",
  name: "Test Playlist",
  tracks: [
    { id: "track1", name: "Track One", artist: "Artist A" },
    { id: "track2", name: "Track Two", artist: "Artist B" },
  ],
};

jest.mock("../utils/Spotify", () => ({
  getPlaylistTracks: jest.fn(() =>
    Promise.resolve([
      { id: "track1", name: "Track One", artist: "Artist A" },
      { id: "track2", name: "Track Two", artist: "Artist B" },
    ])
  ),
  removeTrackFromPlaylist: jest.fn(() => Promise.resolve()),
}));

test("renders UserPlaylistModal with tracks", async () => {
  render(
    <UserPlaylistModal
      playlist={mockPlaylist}
      onClose={mockOnClose}
      onEdit={mockOnEdit}
      updatedPlaylist={mockPlaylist.tracks}
      updatedPlaylistName="Updated Name"
    />
  );

  expect(screen.getByText("Updated Name")).toBeInTheDocument();

  expect(await screen.findByText("Track One")).toBeInTheDocument();
  expect(await screen.findByText("Track Two")).toBeInTheDocument();

  expect(screen.getByRole("dialog")).toBeInTheDocument();
});

test("calls onEdit and onClose when edit button clicked", async () => {
  render(
    <UserPlaylistModal
      playlist={mockPlaylist}
      onClose={mockOnClose}
      onEdit={mockOnEdit}
      updatedPlaylist={mockPlaylist.tracks}
      updatedPlaylistName="Updated Name"
    />
  );

  const editButton = screen.getByRole("button", { name: "edit playlist" });

  await act(async () => {
    fireEvent.click(editButton);
  });

  await waitFor(() => {
    expect(mockOnEdit).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();
  });
});
