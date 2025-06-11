import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../components/SearchBar";
import "@testing-library/jest-dom";

describe("SearchBar component", () => {
  test("Clicking button shows input and focuses it", async () => {
    const { getByRole, queryByPlaceholderText } = render(
      <SearchBar onSearch={() => {}} setTempMessage={() => {}} />
    );

    // Başta input yok
    expect(queryByPlaceholderText("Search...")).toBeNull();

    // Butona tıkla
    const button = getByRole("button", { name: /submit search/i });
    fireEvent.click(button);

    // Input görünür olmalı
    const input = queryByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  test("submitting empty input triggers temp message", async () => {
    const setTempMessage = jest.fn();
    const { container } = render(
      <SearchBar onSearch={jest.fn()} setTempMessage={setTempMessage} />
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const form = container.querySelector("form");
    fireEvent.submit(form);

    expect(setTempMessage).toHaveBeenCalledWith("Please, write something");
  });

  test("submitting filled input calls onSearch", () => {
    const onSearch = jest.fn();

    render(<SearchBar onSearch={onSearch} setTempMessage={jest.fn()} />);
    const button = screen.getByRole("button");

    // İlk tıklamada input açılır
    fireEvent.click(button);
    const input = screen.getByPlaceholderText(/search/i);

    fireEvent.change(input, { target: { value: "Eminem" } });
    fireEvent.click(button); // ikinci tıklama: submit

    expect(onSearch).toHaveBeenCalledWith("Eminem");
  });
});
