import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserPlaylists from "../components/UserPlaylists";

const mockPlaylists = [
  { playlistId: "1", name: "My Playlist 1", tracks: [] },
  { playlistId: "2", name: "My Playlist 2", tracks: [] },
];

test("renders playlist names", () => {
  render(<UserPlaylists playlists={mockPlaylists} />);
  expect(screen.getByText("My Playlist 1")).toBeInTheDocument();
  expect(screen.getByText("My Playlist 2")).toBeInTheDocument();
  fireEvent.click(screen.getByText("My Playlist 1"));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});
