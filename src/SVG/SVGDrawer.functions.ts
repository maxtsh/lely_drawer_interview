import { lineClickPositions, lineStyles, shapes } from "./SVGDrawer.constants";
import type { Svg } from "@svgdotjs/svg.js";
import type {
  Point2D,
  LineNode,
  NodeType,
  LineClickPositionType,
} from "./SVGDrawer.types";

export const getExactCoordinates = (
  clientX: number,
  clientY: number,
  container: HTMLElement | null,
) => {
  if (container) {
    const rect = container.getBoundingClientRect();

    return {
      x: clientX - (rect.left + container.scrollLeft),
      y: clientY - (rect.top + container.scrollTop),
    };
  }

  return {
    x: clientX,
    y: clientY,
  };
};

export const createLine = (start: Point2D, end: Point2D, SVG: Svg) => {
  const id = crypto.randomUUID();

  const element = SVG.line([start.x, start.y, end.x, end.y])
    .id(id)
    .stroke(lineStyles.stroke)
    .css(lineStyles.css);

  const lineNode: LineNode = {
    id,
    element,
    selected: false,
    category: shapes.line,
    position: { start, end },
  };

  return lineNode;
};

export const resizeLineCoordinates = (
  movingPoint: Point2D,
  clickPosition: LineClickPositionType,
  coordinates: { start: Point2D; end: Point2D },
) => {
  if (clickPosition === lineClickPositions.start) {
    return { start: movingPoint, end: coordinates.end };
  }

  if (clickPosition === lineClickPositions.end) {
    return { start: coordinates.start, end: movingPoint };
  }

  return null;
};

export const angle = (start: Point2D, end: Point2D) => {
  const dy = end.y - start.y;
  const dx = end.x - start.x;

  const theta = Math.atan2(dy, dx); // range (-PI, PI]
  const degs = (theta * 180) / Math.PI + 90; // Degree (-180deg - 180deg)

  return degs;
};

export const distance = (start: Point2D, end: Point2D) => {
  const result = Math.sqrt(
    Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2),
  );
  return result;
};

export const isOnTheLine = (
  start: Point2D,
  end: Point2D,
  clickPoint: Point2D,
  maxDistance = 1,
) => {
  const offset =
    distance(start, end) -
    (distance(start, clickPoint) + distance(end, clickPoint));

  return Math.abs(offset) < maxDistance ? lineClickPositions.on : null;
};

export const nearPoint = (
  clickPoint: Point2D,
  point: Point2D,
  name: LineClickPositionType,
) => {
  const result =
    Math.abs(clickPoint.x - point.x) < 5 && Math.abs(clickPoint.y - point.y) < 5
      ? name
      : null;

  return result;
};

export const locateClickedPosition = (clickPoint: Point2D, node: NodeType) => {
  const { start, end } = node.position;

  const on = isOnTheLine(start, end, clickPoint);
  const nearStart = nearPoint(clickPoint, start, lineClickPositions.start);
  const nearEnd = nearPoint(clickPoint, end, lineClickPositions.end);

  const result = nearStart || nearEnd || on;

  return result;
};

export const getElementOnClickedPosition = (
  x: number,
  y: number,
  nodes: Array<NodeType>,
) => {
  return nodes
    .map((node) => ({
      ...node,
      clickPosition: locateClickedPosition({ x, y }, node),
    }))
    .find((node) => node.clickPosition);
};
