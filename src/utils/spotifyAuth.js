// Generates a random string of a given length using alphanumeric characters
export function generateRandomString(length) {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Encodes an ArrayBuffer into a base64 URL-safe string
export function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
// Hashes a plain string using SHA-256 and returns the buffer
export async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return hashBuffer;
}

// Exchanges the authorization code for an access token using the stored code verifier
export async function getTokenFromCode(code, clientId, redirectUri) {
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) {
    throw new Error("Code verifier not found. Please log in again.");
  }

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", codeVerifier);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Spotify token error:", errorText);
    throw new Error("Token request failed");
  }

  const data = await response.json();
  return data;
}
