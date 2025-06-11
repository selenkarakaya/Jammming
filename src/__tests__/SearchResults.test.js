import React from "react";
import { render, screen } from "@testing-library/react";
import SearchResults from "../components/SearchResults";
import "@testing-library/jest-dom";

// Mock Track Bileşeni (varsayılan olarak sadece render testi yapıyoruz)
jest.mock(
  "../components/SearchResultsTrack",
  () =>
    ({ track, addTrackToPlaylist }) =>
      <div data-testid="search-track">{track.name}</div>
);

describe("SearchResults Component", () => {
  const mockTracks = [
    { id: "1", name: "Track 1" },
    { id: "2", name: "Track 2" },
  ];

  const mockAddTrack = jest.fn();

  test("renders title correctly", () => {
    render(
      <SearchResults tracks={mockTracks} addTrackToPlaylist={mockAddTrack} />
    );
    expect(screen.getByText("Results")).toBeInTheDocument();
  });

  test("renders the correct number of tracks", () => {
    render(
      <SearchResults tracks={mockTracks} addTrackToPlaylist={mockAddTrack} />
    );
    const trackElements = screen.getAllByTestId("search-track");
    expect(trackElements.length).toBe(2);
  });
});
