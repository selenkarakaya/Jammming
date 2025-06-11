import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchResultsTrack from "../components/SearchResultsTrack";
import "@testing-library/jest-dom"; // Geçici çözüm; globalde tanıtılmalı

describe("SearchResultsTrack Component", () => {
  const sampleTrackWithPreview = {
    id: "123",
    name: "Lose Yourself",
    artist: "Eminem",
    album: "8 Mile",
    preview_url: "https://p.scdn.co/sample.mp3",
    external_urls: {
      spotify: "https://open.spotify.com/track/123",
    },
  };

  const sampleTrackWithoutPreview = {
    ...sampleTrackWithPreview,
    preview_url: null,
  };

  const mockAddTrack = jest.fn();

  test("displays track information", () => {
    render(
      <SearchResultsTrack
        track={sampleTrackWithPreview}
        addTrackToPlaylist={mockAddTrack}
      />
    );

    expect(screen.getByText("Lose Yourself")).toBeInTheDocument();
    expect(screen.getByText(/Eminem\s*\|\s*8 Mile/)).toBeInTheDocument();
  });

  test("renders audio when preview_url is available", () => {
    render(
      <SearchResultsTrack
        track={sampleTrackWithPreview}
        addTrackToPlaylist={mockAddTrack}
      />
    );

    expect(screen.getByTestId("audio-player")).toBeInTheDocument();
  });

  test("renders spotify icon link when no preview_url", () => {
    render(
      <SearchResultsTrack
        track={sampleTrackWithoutPreview}
        addTrackToPlaylist={mockAddTrack}
      />
    );

    const spotifyLink = screen.getByRole("link");
    expect(spotifyLink).toHaveAttribute(
      "href",
      "https://open.spotify.com/track/123"
    );
  });

  test("calls addTrackToPlaylist when add button is clicked", () => {
    render(
      <SearchResultsTrack
        track={sampleTrackWithPreview}
        addTrackToPlaylist={mockAddTrack}
      />
    );

    const addButton = screen.getByRole("button", {
      name: /add track to playlist/i,
    });
    fireEvent.click(addButton);
    expect(mockAddTrack).toHaveBeenCalledWith(sampleTrackWithPreview);
  });
});
