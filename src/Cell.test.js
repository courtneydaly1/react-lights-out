import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Cell from "./Cell";

test("renders without crashing", () => {
  render(<Cell isLit={false} flipCellsAroundMe={() => {}} />);
});

test("applies the Cell-lit class when isLit is true", () => {
  render(<Cell isLit={true} flipCellsAroundMe={() => {}} />);
  const cell = screen.getByRole("cell");
  expect(cell).toHaveClass("Cell-lit");
});

test("does not apply the Cell-lit class when isLit is false", () => {
  render(<Cell isLit={false} flipCellsAroundMe={() => {}} />);
  const cell = screen.getByRole("cell");
  expect(cell).not.toHaveClass("Cell-lit");
});

test("calls flipCellsAroundMe function when clicked", () => {
  const flipCellsAroundMe = jest.fn();
  render(<Cell isLit={false} flipCellsAroundMe={flipCellsAroundMe} />);
  const cell = screen.getByRole("cell");
  fireEvent.click(cell);
  expect(flipCellsAroundMe).toHaveBeenCalled();
});
