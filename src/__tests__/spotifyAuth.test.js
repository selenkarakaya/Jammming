import {
  generateRandomString,
  base64UrlEncode,
  sha256,
  getTokenFromCode,
} from "../utils/spotifyAuth"; // Yolu kendi projenize göre düzeltin

describe("Utility functions", () => {
  describe("generateRandomString", () => {
    test("generates a string of correct length", () => {
      const length = 16;
      const result = generateRandomString(length);
      expect(result).toHaveLength(length);
      expect(/^[A-Za-z0-9]+$/.test(result)).toBe(true);
    });

    test("generates different values on multiple calls", () => {
      const a = generateRandomString(16);
      const b = generateRandomString(16);
      expect(a).not.toBe(b);
    });
  });

  describe("base64UrlEncode", () => {
    test("encodes buffer to base64 URL-safe string", () => {
      const buffer = new Uint8Array([72, 101, 108, 108, 111]).buffer; // "Hello"
      const encoded = base64UrlEncode(buffer);
      expect(encoded).toBe("SGVsbG8");
    });
  });

  describe("getTokenFromCode", () => {
    const mockCode = "mock_auth_code";
    const mockClientId = "client_id";
    const mockRedirectUri = "http://localhost/callback";
    const mockTokenResponse = {
      access_token: "mock_access_token",
      refresh_token: "mock_refresh_token",
      expires_in: 3600,
    };

    beforeEach(() => {
      // Mock localStorage
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => "mock_verifier"),
        },
        writable: true,
      });

      // Mock fetch
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTokenResponse),
        })
      );
    });

    test("sends token request and returns token data", async () => {
      const tokenData = await getTokenFromCode(
        mockCode,
        mockClientId,
        mockRedirectUri
      );

      expect(tokenData).toEqual(mockTokenResponse);
      expect(fetch).toHaveBeenCalledWith(
        "https://accounts.spotify.com/api/token",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: expect.any(String),
        })
      );
    });

    test("throws error if code_verifier not found", async () => {
      window.localStorage.getItem = jest.fn(() => null);
      await expect(
        getTokenFromCode(mockCode, mockClientId, mockRedirectUri)
      ).rejects.toThrow("Code verifier not found");
    });
  });
});
