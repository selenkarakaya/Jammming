import Spotify from "../utils/Spotify";

describe("Spotify module", () => {
  const mockToken = "mock_token";
  const mockUserId = "mock_user_id";

  beforeEach(() => {
    const mockStore = {
      spotify_access_token: mockToken,
      spotify_refresh_token: "mock_refresh_token",
    };

    const localStorageMock = {
      getItem: jest.fn((key) => mockStore[key] || null),
      setItem: jest.fn((key, value) => {
        mockStore[key] = value;
      }),
      removeItem: jest.fn((key) => {
        delete mockStore[key];
      }),
      clear: jest.fn(() => {
        Object.keys(mockStore).forEach((key) => delete mockStore[key]);
      }),
    };

    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    global.fetch = jest.fn();
  });

  test("getAccessToken should return token from localStorage", () => {
    const token = Spotify.getAccessToken();
    expect(token).toBe(mockToken);
  });

  test("getRefreshToken should return refresh token from localStorage", () => {
    const refreshToken = Spotify.getRefreshToken();
    expect(refreshToken).toBe("mock_refresh_token");
  });

  test("search should return mapped track results", async () => {
    const mockSearchResponse = {
      tracks: {
        items: [
          {
            id: "1",
            name: "Song One",
            artists: [{ name: "Artist A" }],
            album: { name: "Album A" },
            uri: "spotify:track:1",
            preview_url: null,
            external_urls: { spotify: "https://open.spotify.com/track/1" },
          },
        ],
      },
    };

    jest.spyOn(Spotify, "ensureAccessToken").mockResolvedValue(mockToken);
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockSearchResponse),
    });

    const results = await Spotify.search("Song");
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe("Song One");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("getUserPlaylists should return list of user playlists", async () => {
    jest.spyOn(Spotify, "ensureAccessToken").mockResolvedValue(mockToken);
    jest.spyOn(Spotify, "getCurrentUserId").mockResolvedValue(mockUserId);

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          items: [
            { id: "1", name: "Playlist A" },
            { id: "2", name: "Playlist B" },
          ],
        }),
    });

    const playlists = await Spotify.getUserPlaylists();
    expect(playlists).toEqual([
      { playlistId: "1", name: "Playlist A" },
      { playlistId: "2", name: "Playlist B" },
    ]);
  });

  test("refreshAccessToken should set new token if successful", async () => {
    const mockNewToken = "new_access_token";

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        access_token: mockNewToken,
        expires_in: 3600,
      }),
    });

    const token = await Spotify.refreshAccessToken();

    expect(token).toBe(mockNewToken);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "spotify_access_token",
      mockNewToken
    );
  });

  test("removeTrackFromPlaylist should send DELETE request to Spotify API", async () => {
    jest.spyOn(Spotify, "ensureAccessToken").mockResolvedValue(mockToken);

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
    });

    await Spotify.removeTrackFromPlaylist("playlist123", "track123");

    expect(fetch).toHaveBeenCalledWith(
      "https://api.spotify.com/v1/playlists/playlist123/tracks",
      expect.objectContaining({
        method: "DELETE",
        headers: expect.objectContaining({
          Authorization: `Bearer ${mockToken}`,
        }),
        body: JSON.stringify({
          tracks: [{ uri: "spotify:track:track123" }],
        }),
      })
    );
  });
});
