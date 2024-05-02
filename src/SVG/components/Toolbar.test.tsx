import { render, screen } from "@testing-library/react";
import Toolbar from "./Toolbar";

test("Toolbar renders correctly", () => {
  render(<Toolbar />);

  const drawBtn = screen.getByLabelText(/draw/i);
  const selectBtn = screen.getByLabelText(/draw/i);
  const cleanBtn = screen.getByLabelText(/draw/i);

  expect(drawBtn).toBeInTheDocument();
  expect(selectBtn).toBeInTheDocument();
  expect(cleanBtn).toBeInTheDocument();
});
