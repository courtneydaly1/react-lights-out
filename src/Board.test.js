import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Board from "./Board";
import Cell from "./Cell";

// Mock Cell component to simplify testing
jest.mock("./Cell", () => ({ isLit, flipCellsAroundMe }) => (
  <div
    data-testid="cell"
    className={`Cell ${isLit ? "Cell-lit" : ""}`}
    onClick={flipCellsAroundMe}
  />
));

test("renders without crashing", () => {
  render(<Board />);
});

test("renders correct number of cells", () => {
  const { container } = render(<Board nrows={5} ncols={4} chanceLightStartsOn={0.15} />);
  const cells = container.querySelectorAll("[data-testid='cell']");
  expect(cells.length).toBe(20); // 5 rows * 4 columns
});

test("initially lights some cells", () => {
  const { container } = render(<Board nrows={5} ncols={4} chanceLightStartsOn={1} />);
  const cells = container.querySelectorAll("[data-testid='cell']");
  cells.forEach(cell => {
    expect(cell).toHaveClass("Cell-lit");
  });
});

test("hasWon function works correctly", () => {
  render(<Board nrows={5} ncols={4} chanceLightStartsOn={0} />);
  expect(screen.getByText("You WIN!!")).toBeInTheDocument();
});

test("flipCellsAround function works correctly", () => {
  const { container } = render(<Board nrows={5} ncols={4} chanceLightStartsOn={0} />);
  const firstCell = container.querySelector("[data-testid='cell']");
  
  // Initial state: all cells are off
  fireEvent.click(firstCell);
  
  // Check if the first cell and its neighbors have flipped
  const flippedCells = container.querySelectorAll(".Cell-lit");
  expect(flippedCells.length).toBeGreaterThan(0);
});
