// utils/savePlaylistToSpotify.js
/*
 *Used to save or update a playlist to Spotify, then trigger UI update afterward.
 */
import Spotify from "./Spotify";

export async function savePlaylistToSpotify({
  name,
  tracks,
  playlistId,
  onSave,
  onUpdate,
  onReset,
}) {
  if (!name.trim()) throw new Error("Please enter a playlist name.");
  if (tracks.length === 0) throw new Error("Add some songs first!");

  const uris = tracks.map((t) => t.uri);
  await Spotify.savePlaylist(name, uris, playlistId);

  if (playlistId) {
    const updated = await Spotify.getPlaylistTracks(playlistId);
    onUpdate?.(updated, name);
  } else {
    const newPlaylists = await Spotify.getUserPlaylists();
    onSave?.(newPlaylists);
  }

  onReset?.();
}

/*
The question mark in onReset?.(), onUpdate? is the optional chaining operator. 
If onReset is defined and is a function, call it; otherwise, do nothing and don’t throw an error.
*If onReset exists and is callable, onReset() is executed.
*If onReset is undefined or null, it safely skips calling it without throwing an error.
*/
