import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewPlaylist from "../components/NewPlaylist";
import "@testing-library/jest-dom";

jest.mock("../components/SavePlaylistButton", () => () => (
  <div>Mocked Save Button</div>
));

jest.mock(
  "../components/NewPlaylistTrack",
  () =>
    ({ playlistTrack, onRemove }) =>
      (
        <div data-testid="playlist-track">
          <span>{playlistTrack.name}</span>
          <button onClick={() => onRemove(playlistTrack.id)}>Remove</button>
        </div>
      )
);

describe("NewPlaylist component", () => {
  const sampleTracks = [
    { id: "1", name: "Track One", artist: "Artist A", album: "Album X" },
    { id: "2", name: "Track Two", artist: "Artist B", album: "Album Y" },
  ];

  const mockSetName = jest.fn();
  const mockRemoveTrack = jest.fn();

  const setup = (props = {}) => {
    return render(
      <NewPlaylist
        playlistTracks={sampleTracks}
        removeTrackFromPlaylist={mockRemoveTrack}
        playlistName="My Playlist"
        setPlaylistName={mockSetName}
        tempMessage={props.tempMessage || ""}
        onReset={() => {}}
        playlistId={null}
        onSave={() => {}}
        onUpdate={() => {}}
      />
    );
  };

  test("renders playlist editor title", () => {
    setup();
    expect(screen.getByText("Playlist Editor")).toBeInTheDocument();
  });

  test("renders playlist name input and updates on change", () => {
    setup();
    const input = screen.getByPlaceholderText("Enter playlist name");
    fireEvent.change(input, { target: { value: "Chill Vibes" } });
    expect(mockSetName).toHaveBeenCalledWith("Chill Vibes");
  });

  test("renders correct number of tracks", () => {
    setup();
    expect(screen.getAllByTestId("playlist-track")).toHaveLength(2);
  });

  test("calls remove function when remove button clicked", () => {
    setup();
    const removeButtons = screen.getAllByText("Remove");
    fireEvent.click(removeButtons[0]);
    expect(mockRemoveTrack).toHaveBeenCalledWith("1");
  });

  test("renders mocked save playlist button", () => {
    setup();
    expect(screen.getByText("Mocked Save Button")).toBeInTheDocument();
  });

  test("displays temporary message if present", () => {
    setup({ tempMessage: "Playlist saved!" });
    expect(screen.getByText("Playlist saved!")).toBeInTheDocument();
  });
});
