import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserPlaylistTrackItem from "../components/UserPlaylistTrackItem";

test("calls onRemove when remove button is clicked", () => {
  const mockTrack = {
    name: "Test Song",
    artist: "Test Artist",
    album: "Test Album",
    external_urls: { spotify: "https://spotify.com" },
  };
  const onRemove = jest.fn();

  render(<UserPlaylistTrackItem track={mockTrack} onRemove={onRemove} />);

  const button = screen.getByRole("button", { name: /Remove Test Song/i });
  fireEvent.click(button);

  expect(onRemove).toHaveBeenCalled();
});
