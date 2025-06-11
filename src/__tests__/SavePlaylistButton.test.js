import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import SavePlaylistButton from "../components/SavePlaylistButton";
import { savePlaylistToSpotify } from "../utils/savePlaylistToSpotify";
import "@testing-library/jest-dom";

jest.mock("../utils/savePlaylistToSpotify", () => ({
  savePlaylistToSpotify: jest.fn(),
}));

describe("SavePlaylistButton", () => {
  const sampleTracks = [{ uri: "spotify:track:123" }];
  const playlistName = "Test Playlist";

  const commonProps = {
    playlistTracks: sampleTracks,
    playlistName,
    playlistId: null,
    onReset: jest.fn(),
    onSave: jest.fn(),
    onUpdate: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    console.error.mockRestore();
    jest.clearAllMocks();
  });

  test("calls savePlaylistToSpotify when button is clicked", async () => {
    savePlaylistToSpotify.mockResolvedValue();

    render(<SavePlaylistButton {...commonProps} />);

    const button = screen.getByRole("button", { name: /save to spotify/i });

    fireEvent.click(button);

    await waitFor(() => {
      expect(savePlaylistToSpotify).toHaveBeenCalledWith(
        expect.objectContaining({
          name: playlistName,
          tracks: sampleTracks,
          playlistId: null,
        })
      );
    });
  });

  test("shows error toast when save fails", async () => {
    savePlaylistToSpotify.mockRejectedValue(new Error("Save failed"));

    render(<SavePlaylistButton {...commonProps} />);

    fireEvent.click(screen.getByRole("button", { name: /save to spotify/i }));

    // Hata işleme tamamlanana kadar bekle
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  test("disables duplicate save when isSaving is true", async () => {
    let resolvePromise;
    savePlaylistToSpotify.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        })
    );

    render(<SavePlaylistButton {...commonProps} />);

    const button = screen.getByRole("button", { name: /save to spotify/i });

    // Click once - triggers save
    fireEvent.click(button);
    // Click again while saving - should not trigger second save
    fireEvent.click(button);

    expect(savePlaylistToSpotify).toHaveBeenCalledTimes(1);

    // Resolve the promise so component can update state and finish saving
    await act(async () => {
      resolvePromise();
    });
  });
});
