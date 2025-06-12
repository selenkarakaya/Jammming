# 🎵 Jamming

Jammming is a React web application that allows users to search songs via the Spotify API, create a custom playlist, and export it directly to their Spotify account.

## 🔗 Live Demo

[Jammming Live Demo](https://spotifyapijamming.netlify.app)

<p align="center">
  <img src="https://codecov.io/gh/selenkarakaya/jamming/branch/main/graph/badge.svg" alt="Coverage Badge" width="150" />
</p>
<div style="display: flex; justify-content: space-between; align-items: center;">
  <h1 style="margin: 0 auto;">🎵 Jamming</h1>
  <img src="https://codecov.io/gh/selenkarakaya/jamming/branch/main/graph/badge.svg" alt="Coverage Badge" width="150" />
</div>

---

## 📌 Project Purpose

The purpose of this project is to demonstrate knowledge and practical application of React concepts such as:

- Component-based architecture
- State management and prop drilling
- Working with external APIs (Spotify)
- Handling OAuth authentication
- Managing HTTP requests and responses
- Real-world web app deployment

---

## ⚙️ Technologies Used

- **React** (Functional Components + Hooks)
- **JavaScript**
- **HTML5 & CSS3 & Tailwind**
- **Spotify Web API**
- **Netlify** for deployment
- **Git + GitHub** for version control

---

## ✨ Features

- 🔍 **Search Songs**  
  Users can search songs by title, artist name, or album.

- 📄 **View Song Info**  
  View details such as song title, artist, and album cover.

- 🎵 **Preview Tracks**
  Each track includes a preview sample (redirects to Spotify for playback).

- ➕ **Build a Playlist**  
  Add and remove tracks to create a custom playlist.

- 🚫 **Duplicate-Free Search Results**
  Only display songs not currently present in the playlist in the search results.

- 🔐 **Spotify Authentication**  
  Secure login with Spotify via OAuth 2.0.

- 🚀 **Save Playlist to Spotify**  
  Save your custom playlist directly to your Spotify account, with loading feedback during save.

- 📁 **View & Edit Existing Playlists**
  Users can view their existing playlists, rename them, add new tracks, or remove existing ones.

---

## 🛠 Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jamming.git
   cd jammming
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📊 Lighthouse Score

| Category       | Score                                                                 |
| -------------- | --------------------------------------------------------------------- |
| Performance    | ![98](https://img.shields.io/badge/Performance-98%25-brightgreen)     |
| Accessibility  | ![100](https://img.shields.io/badge/Accessibility-100%25-brightgreen) |
| Best Practices | ![96](https://img.shields.io/badge/Best_Practices-100%25-brightgreen) |
| SEO            | ![91](https://img.shields.io/badge/SEO-90%25-yellow)                  |

---

## Detailed Test Coverage Report for Each File

| File                      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                               |
| ------------------------- | ------- | -------- | ------- | ------- | --------------------------------------------------------------- |
| All files                 | 69.53   | 64.04    | 78.2    | 70.62   |                                                                 |
| components                | 80.64   | 84.31    | 76.47   | 83.1    |                                                                 |
| Home.jsx                  | 70      | 80       | 53.84   | 72.91   | 39,81-90,95-97,109                                              |
| LoadingScreen.jsx         | 100     | 100      | 100     | 100     |                                                                 |
| Login.jsx                 | 100     | 100      | 100     | 100     |                                                                 |
| NewPlaylist.jsx           | 100     | 100      | 100     | 100     |                                                                 |
| NewPlaylistTrack.jsx      | 100     | 100      | 100     | 100     |                                                                 |
| RippleButton.jsx          | 80      | 100      | 57.14   | 91.66   | 14                                                              |
| SavePlaylistButton.jsx    | 100     | 83.33    | 100     | 100     | 31                                                              |
| SearchBar.jsx             | 100     | 100      | 100     | 100     |                                                                 |
| SearchResults.jsx         | 100     | 100      | 100     | 100     |                                                                 |
| SearchResultsTrack.jsx    | 100     | 75       | 100     | 100     | 27                                                              |
| UserPlaylistModal.jsx     | 64.51   | 90       | 75      | 66.66   | 30-31,38-45,85                                                  |
| UserPlaylistTrackItem.jsx | 100     | 100      | 100     | 100     |                                                                 |
| UserPlaylists.jsx         | 90.9    | 66.66    | 80      | 90.9    | 59                                                              |
| hooks                     | 100     | 100      | 100     | 100     |                                                                 |
| usePlaylistManager.js     | 100     | 100      | 100     | 100     |                                                                 |
| utils                     | 51.93   | 33.33    | 73.68   | 52.03   |                                                                 |
| Spotify.js                | 46.07   | 28.12    | 73.33   | 46.39   | 46,59-71,81,108-116,133-138,178-258,282,291-293,305-315,355-358 |
| spotifyAuth.js            | 74.07   | 75       | 75      | 73.07   | 21-24,49-51                                                     |

---

### 👤 Author

Built as part of **Codecademy’s Jamming Project** with additional custom features.

🛠 Maintained by **Selen Karakaya**  
📫 [selennurkarakayaa@gmail.com](mailto:selennurkarakayaa@gmail.com)  
🐙 [github.com/selenkarakaya](https://github.com/selenkarakaya)  
📌 [LinkedIn](https://www.linkedin.com/in/selenkarakaya/)  
🌍 [Portfolio Website](https://selenkarakaya.netlify.app/)
