/**
 * Spotify API Client - Jamming App
 *
 * This module contains all the core functions required to interact with the Spotify Web API.
 * It uses PKCE (Proof Key for Code Exchange) OAuth 2.0 authorization method
 * for user authentication, token management, searching tracks, and creating/updating playlists.
 *
 * @module Spotify
 */

import { generateRandomString, sha256, base64UrlEncode } from "./spotifyAuth";

// Spotify application client ID (unique identifier for the app)
const clientId = "21b64e14c1a9424d92b5cb31a803a393";
// Requested scopes (permissions) from the user
const scope = "playlist-modify-public playlist-modify-private";

// Redirect URI where user is sent after authentication.
// Dynamically determined based on environment (local or production).
const redirectUri =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? "http://127.0.0.1:5173/callback"
    : "https://spotifyapijamming.netlify.app/callback";

const Spotify = {
  /**
   * Retrieves the access token from localStorage.
   * @returns {string|null} Spotify access token
   */
  getAccessToken() {
    return localStorage.getItem("spotify_access_token");
  },

  /**
   * Retrieves the refresh token from localStorage.
   * @returns {string|null} Spotify refresh token
   */
  getRefreshToken() {
    return localStorage.getItem("spotify_refresh_token");
  },

  setTokens({ access_token, refresh_token, expires_in }) {
    localStorage.setItem("spotify_access_token", access_token);
    if (refresh_token) {
      localStorage.setItem("spotify_refresh_token", refresh_token);
    }

    // Store expiry timestamp to auto-clear or refresh token when it expires
    const expiryTime = new Date().getTime() + expires_in * 1000;
    localStorage.setItem("spotify_token_expiry", expiryTime);
  },

  /*
   * Redirects the user to Spotify's OAuth authorization page.
   * Generates and stores a PKCE code_verifier and code_challenge for security.
   */
  async redirectToSpotify() {
    const codeVerifier = generateRandomString(128);
    localStorage.setItem("code_verifier", codeVerifier);

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64UrlEncode(hashed);

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scope
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    window.location = authUrl;
  },
  /*
   * Requests a new access token from Spotify using the refresh token.
   * If the refresh token is missing or the request fails, tokens are cleared and the user is redirected to login.
   */
  async refreshAccessToken() {
    const refresh_token = this.getRefreshToken();
    console.log("Using refresh_token:", refresh_token);
    if (!refresh_token) {
      throw new Error("No refresh token found.");
    }

    const params = new URLSearchParams({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();

    if (data.access_token) {
      this.setTokens({
        access_token: data.access_token,
        expires_in: data.expires_in,
        // Refresh token usually not returned again, keep the existing one
      });
      return data.access_token;
    } else {
      localStorage.removeItem("spotify_access_token");
      localStorage.removeItem("spotify_refresh_token");
      localStorage.removeItem("spotify_token_expiry");
      localStorage.setItem(
        "logout_reason",
        "Session expired. Please log in again."
      );
      window.location.href = "/login";
      throw new Error("Token refresh failed.");
    }
  },

  /*
   * Ensures there is a valid access token.
   * Refreshes the token if expired, or throws an error if no token is available.
   */
  async ensureAccessToken() {
    const token = this.getAccessToken();
    const expiry = localStorage.getItem("spotify_token_expiry");
    const now = new Date().getTime();

    if (!token) {
      throw new Error("No access token available.");
    }

    if (expiry && now > expiry) {
      // Token has expired, refresh it
      return await this.refreshAccessToken();
    }

    return token;
  },

  /*
   * Searches Spotify for tracks matching the provided search term.
   * @param {string} term Search query string
   * @returns {Promise<Array>} Array of track objects matching the search
   */

  async search(term) {
    const token = await this.ensureAccessToken();

    const endpoint = `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(
      term
    )}`;

    const response = await fetch(endpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await response.json();
    if (!json.tracks) return [];

    return json.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      preview_url: track.preview_url,
      external_urls: track.external_urls,
    }));
  },

  /**
   * Retrieves the current authenticated user's Spotify ID.
   * @returns {Promise<string>} Spotify user ID
   */

  async getCurrentUserId() {
    try {
      const token = await this.ensureAccessToken();

      const userResponse = await fetch("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userResponse.json();
      const userId = userData.id;

      return userId;
    } catch (error) {
      console.error("Error in getCurrentUserId:", error);
      throw error;
    }
  },

  /**
   * Saves a playlist by either creating a new one or updating an existing one.
   * If playlistId is provided, it updates the playlist name and replaces tracks.
   * Otherwise, it creates a new playlist and adds tracks.
   * @param {string} name Playlist name
   * @param {Array<string>} trackUris Array of Spotify track URIs
   * @param {string} [playlistId] Optional playlist ID to update
   */

  async savePlaylist(name, trackUris, playlistId) {
    if (!name || !trackUris.length) return;

    const token = await this.ensureAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    const userId = await this.getCurrentUserId();

    // Update existing playlist name and tracks
    if (playlistId) {
      try {
        await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify({ name }),
        });

        await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      } catch (err) {
        console.error("Failed to update existing playlist", err);
      }
    } else {
      // Create a new playlist and add tracks
      try {
        const createPlaylistResponse = await fetch(
          `https://api.spotify.com/v1/users/${userId}/playlists`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ name }),
          }
        );

        const playlistData = await createPlaylistResponse.json();

        await fetch(
          `https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ uris: trackUris }),
          }
        );
      } catch (err) {
        console.error("Failed to create new playlist", err);
      }
    }
  },

  /**
   * Retrieves all playlists of the current user.
   * @returns {Promise<Array>} Array of playlist objects with playlistId and name
   */

  async getUserPlaylists() {
    try {
      const token = await this.ensureAccessToken();
      const user_id = await this.getCurrentUserId();

      const allPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${user_id}/playlists`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!allPlaylistResponse.ok) {
        throw new Error("Failed to get playlists");
      }

      const allPlaylist = await allPlaylistResponse.json();
      return allPlaylist.items.map((playlist) => ({
        playlistId: playlist.id,
        name: playlist.name,
      }));
    } catch (error) {
      console.error("Error fetching user playlists:", error);
      // You can add a toast notification or another method here to inform the user if you want
      return []; // Return an empty array in case of an error
    }
  },

  /**
   * Retrieves specified playlist of the current user.
   * @param {string} playlistId :  playlist ID
   * @returns {Promise<Array>} Tracks in specified playlist
   */
  async getPlaylistTracks(playlistId) {
    try {
      const token = await this.ensureAccessToken();
      const user_id = await this.getCurrentUserId();

      const playlistTracksResponse = await fetch(
        `https://api.spotify.com/v1/users/${user_id}/playlists/${playlistId}/tracks`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } }
      );
      if (!playlistTracksResponse.ok) {
        throw new Error("Failed to get playlist's tracks");
      }
      const playlistTracks = await playlistTracksResponse.json();
      return playlistTracks.items.map((item) => ({
        id: item.track.id,
        name: item.track.name,
        artist: item.track.artists[0].name,
        album: item.track.album.name,
        uri: item.track.uri,
        preview_url: item.track.preview_url,
        external_urls: item.track.external_urls,
      }));
    } catch (error) {
      console.error("Error fetching playlist tracks", error);
      return [];
    }
  },

  /**
   * Removes a track from the specified playlist.
   * @param {string} playlistId The ID of the playlist
   * @param {string} trackId The ID of the track to be removed
   */

  async removeTrackFromPlaylist(playlistId, trackId) {
    try {
      const token = await this.ensureAccessToken();

      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tracks: [{ uri: `spotify:track:${trackId}` }],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to remove track: ${response.statusText}`);
      }

      console.log("Track successfully removed from playlist.");
    } catch (error) {
      console.error("Error removing track from playlist:", error);
    }
  },
};

export default Spotify;

/*
Methods defined within the same object use this to call each other 
because this refers to the object that the current method belongs to (in this case, the Spotify object).
*/
