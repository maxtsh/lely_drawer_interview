import { render, screen } from "@testing-library/react";
import { angle } from "./SVGDrawer.functions";
import SVGDrawer from "./SVGDrawer";

describe("SVGDrawer component", () => {
  test("SVG Drawer renders correctly", () => {
    render(<SVGDrawer />);

    const drawBtn = screen.getByLabelText(/draw/i);
    const selectBtn = screen.getByLabelText(/draw/i);
    const cleanBtn = screen.getByLabelText(/draw/i);

    expect(drawBtn).toBeInTheDocument();
    expect(selectBtn).toBeInTheDocument();
    expect(cleanBtn).toBeInTheDocument();
  });
});

describe("SVG Drawer utilities", () => {
  test("Angle calculator", () => {
    const result = angle({ x: 0, y: 4 }, { x: 2, y: 4 });

    expect(result).toBe(90);
  });
});
