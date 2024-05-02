import { render, screen } from "@testing-library/react";
import {
  angle,
  distance,
  isOnTheLine,
  nearPoint,
  locateClickedPosition,
} from "./SVGDrawer.functions";
import SVGDrawer from "./SVGDrawer";
import { lineClickPositions, shapes } from "./SVGDrawer.constants";
import { SVG } from "@svgdotjs/svg.js";

const svgContainer = SVG().line();

afterEach(() => {
  svgContainer.clear();
});

describe("SVGDrawer component", () => {
  test("SVG Drawer renders correctly", () => {
    render(<SVGDrawer />);

    const canvas = screen.getByLabelText(/canvas/i);

    expect(canvas).toBeInTheDocument();
  });
});

describe("SVG Drawer utilities", () => {
  test("Angle calculator", () => {
    const result1 = angle({ x: 0, y: 4 }, { x: 2, y: 4 });
    const result2 = angle({ x: 2, y: 16 }, { x: 2, y: 6 });

    expect(result1).toBe(90);
    expect(result2).toBe(0);
  });

  test("Distance calculator", () => {
    const result1 = distance({ x: 0, y: 0 }, { x: 0, y: 0 });
    const result2 = distance({ x: 2, y: 6 }, { x: 2, y: 10 });
    const result3 = distance({ x: 2, y: 4 }, { x: 10, y: 4 });
    const result4 = distance({ x: 2, y: 10 }, { x: 2, y: 4 });

    expect(result1).toBe(0);
    expect(result2).toBe(4);
    expect(result3).toBe(8);
    expect(result4).toBe(6);
  });

  test("Is on the line calculator", () => {
    const result1 = isOnTheLine(
      { x: 0, y: 1 },
      { x: 10, y: 1 },
      { x: 4, y: 1 },
    );

    const result2 = isOnTheLine(
      { x: 2, y: 4 },
      { x: 2, y: 12 },
      { x: 10, y: 12 },
    );

    expect(result1).toBe(lineClickPositions.on);
    expect(result2).toBeNull();
  });

  test("Near point calculator", () => {
    const result1 = nearPoint(
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      lineClickPositions.start,
    );

    const result2 = nearPoint(
      { x: 3, y: 11 },
      { x: 2, y: 12 },
      lineClickPositions.end,
    );

    expect(result1).toBe(lineClickPositions.start);
    expect(result2).toBe(lineClickPositions.end);
  });

  test("Locate clicked position", () => {
    const result1 = locateClickedPosition(
      { x: 10, y: 12 },
      {
        id: "1",
        selected: false,
        category: shapes.line,
        element: svgContainer,
        connections: { start: null, end: null },
        position: { start: { x: 1, y: 12 }, end: { x: 2, y: 15 } },
      },
    );
    const result2 = locateClickedPosition(
      { x: 2, y: 2 },
      {
        id: "1",
        selected: false,
        category: shapes.line,
        element: svgContainer,
        connections: { start: null, end: null },
        position: { start: { x: 1, y: 1 }, end: { x: 4, y: 5 } },
      },
    );
    const result3 = locateClickedPosition(
      { x: 9, y: 15 },
      {
        id: "1",
        selected: false,
        category: shapes.line,
        element: svgContainer,
        connections: { start: null, end: null },
        position: { start: { x: 3, y: 11 }, end: { x: 8, y: 13 } },
      },
    );

    expect(result1).toBeNull();
    expect(result2).toBe(lineClickPositions.start);
    expect(result3).toBe(lineClickPositions.end);
  });
});
