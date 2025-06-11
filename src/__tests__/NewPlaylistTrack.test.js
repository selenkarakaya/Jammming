import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewPlaylistTrack from "../components/NewPlaylistTrack";
import "@testing-library/jest-dom";

describe("NewPlaylistTrack", () => {
  const mockTrack = {
    id: "abc123",
    name: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
  };
  const mockRemove = jest.fn();

  beforeEach(() => {
    mockRemove.mockClear();
  });

  test("renders track info correctly", () => {
    render(
      <NewPlaylistTrack playlistTrack={mockTrack} onRemove={mockRemove} />
    );

    expect(screen.getByText("Bohemian Rhapsody")).toBeInTheDocument();
    expect(
      screen.getByText("Queen | A Night at the Opera")
    ).toBeInTheDocument();
  });

  test("calls onRemove with track id when remove button is clicked", () => {
    render(
      <NewPlaylistTrack playlistTrack={mockTrack} onRemove={mockRemove} />
    );

    const button = screen.getByRole("button", {
      name: /bohemian rhapsody from playlist/i,
    });
    fireEvent.click(button);

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith("abc123");
  });
});
