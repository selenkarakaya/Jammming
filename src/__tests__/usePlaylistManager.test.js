import { renderHook, act } from "@testing-library/react";
import usePlaylistManager from "../hooks/usePlaylistManager";

import "@testing-library/jest-dom";

describe("usePlaylistManager", () => {
  test("should initialize with empty playlist and no name/id", () => {
    const { result } = renderHook(() => usePlaylistManager());

    expect(result.current.playlistTracks).toEqual([]);
    expect(result.current.playlistName).toBe("");
    expect(result.current.playlistId).toBeNull();
  });

  test("addTrack adds a new track", () => {
    const { result } = renderHook(() => usePlaylistManager());

    act(() => {
      result.current.addTrack({ id: "1", name: "Track 1" });
    });

    expect(result.current.playlistTracks).toHaveLength(1);
    expect(result.current.playlistTracks[0].id).toBe("1");
  });

  test("addTrack does not add duplicate tracks", () => {
    const { result } = renderHook(() => usePlaylistManager());

    act(() => {
      result.current.addTrack({ id: "1", name: "Track 1" });
      result.current.addTrack({ id: "1", name: "Track 1" }); // duplicate
    });

    expect(result.current.playlistTracks).toHaveLength(1);
  });

  test("removeTrack removes track by id", () => {
    const { result } = renderHook(() => usePlaylistManager());

    act(() => {
      result.current.addTrack({ id: "1", name: "Track 1" });
      result.current.addTrack({ id: "2", name: "Track 2" });
    });

    act(() => {
      result.current.removeTrack("1");
    });

    expect(result.current.playlistTracks).toHaveLength(1);
    expect(result.current.playlistTracks[0].id).toBe("2");
  });

  test("reset clears playlist and name/id", () => {
    const { result } = renderHook(() => usePlaylistManager());

    act(() => {
      result.current.addTrack({ id: "1", name: "Track 1" });
      result.current.setPlaylistName("My Playlist");
      result.current.setPlaylistId("123");
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.playlistTracks).toEqual([]);
    expect(result.current.playlistName).toBe("");
    expect(result.current.playlistId).toBeNull();
  });
});
