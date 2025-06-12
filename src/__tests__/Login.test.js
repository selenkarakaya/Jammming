import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../components/Login";
import "@testing-library/jest-dom";
import { toast } from "react-toastify";

jest.mock("../utils/Spotify", () => ({
  redirectToSpotify: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    info: jest.fn(),
  },
}));

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders login button", () => {
    render(<Login />);
    expect(
      screen.getByRole("button", {
        name: /log in to your spotify account/i,
      })
    ).toBeInTheDocument();
  });

  test("calls redirectToSpotify on button click", () => {
    const { redirectToSpotify } = require("../utils/Spotify");

    render(<Login />);
    const button = screen.getByRole("button", {
      name: /log in to your spotify account/i,
    });
    fireEvent.click(button);

    expect(redirectToSpotify).toHaveBeenCalled();
  });

  test("displays toast message if logout reason is in localStorage", () => {
    localStorage.setItem(
      "logout_reason",
      "Session expired. Please log in again."
    );
    render(<Login />);
    expect(toast.info).toHaveBeenCalledWith(
      "Session expired. Please log in again."
    );
    expect(localStorage.getItem("logout_reason")).toBeNull(); // Silindi mi kontrolü
  });
});
