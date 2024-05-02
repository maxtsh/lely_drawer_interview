import {
  actions,
  shapes,
  lineStyles,
  markerStyles,
  lineClickPositions,
} from "./SVGDrawer.constants";
import type { G, Svg } from "@svgdotjs/svg.js";
import type {
  Point2D,
  LineNode,
  NodeType,
  SelectedNode,
  LineClickPositionType,
} from "./SVGDrawer.types";
import type { StoreTypes } from "./store";

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

export const createMarkers = (
  group: G | null,
  node: NodeType,
  radius: number = 12,
) => {
  if (group) {
    if (group.children().length) group.clear();

    const startCircle = group
      .circle(radius)
      .id(`${node.id}-start`)
      .fill(markerStyles.css.color)
      .css({ cursor: "move" })
      .move(
        node.position.start.x - radius / 2,
        node.position.start.y - radius / 2,
      );

    const endCircle = group
      .circle(radius)
      .id(`${node.id}-end`)
      .fill(markerStyles.css.color)
      .css({ cursor: "move" })
      .move(node.position.end.x - radius / 2, node.position.end.y - radius / 2);

    group.add(startCircle);
    group.add(endCircle);
  }
};

export const createLine = (start: Point2D, end: Point2D, SVG: Svg) => {
  const id = crypto.randomUUID();

  const element = SVG.line([start.x, start.y, end.x, end.y])
    .id(id)
    .stroke(lineStyles.selected.stroke)
    .css(lineStyles.selected.css);

  const lineNode: LineNode = {
    id,
    element,
    selected: true,
    category: shapes.line,
    position: { start, end },
    connections: { start: null, end: null },
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

export const drawing = (
  movingPoint: Point2D,
  nodes: Array<NodeType>,
  SVGContainer: Svg,
  setNodes: StoreTypes.StoreType["actions"]["setNodes"],
) => {
  const latestNodeIndex = nodes.length - 1;
  const latestNode = nodes.at(latestNodeIndex);

  if (latestNode) {
    const updatedLine = createLine(
      { x: latestNode.position.start.x, y: latestNode.position.start.y },
      { x: movingPoint.x, y: movingPoint.y },
      SVGContainer,
    );

    setNodes((nodes) =>
      nodes.map((node, idx) => {
        if (idx === latestNodeIndex) node = updatedLine;
        return node;
      }),
    );

    // Removing previous instances of line added by SVGContainer => There may probably be better way to do this
    // Instead of using SVGContainer and adding all the lines in createLine directly to the DOM, we gathers them in a single wrapper
    // And After every update in elements array, it gives the task to the useEffect
    updatedLine.element.remove();
  }
};

export const selecting = (
  clickPoint: Point2D,
  nodes: Array<NodeType>,
  group: G | null,
  setSelectedNode: (node: SelectedNode) => void,
  setNodes: StoreTypes.StoreType["actions"]["setNodes"],
  setActionMode: StoreTypes.StoreType["actions"]["setActionMode"],
) => {
  const clickedNode = getElementOnClickedPosition(
    clickPoint.x,
    clickPoint.y,
    nodes,
  );

  // Click on a node
  if (clickedNode) {
    const isOnTheLine = clickedNode.clickPosition === lineClickPositions.on;
    const nearStartOrEnd =
      clickedNode.clickPosition === lineClickPositions.start ||
      clickedNode.clickPosition === lineClickPositions.end;

    if (nearStartOrEnd) setActionMode(actions.resizing);
    if (isOnTheLine) setActionMode(actions.moving);

    // Calculating click point offset to the start point of the node
    const offsetX = clickPoint.x - clickedNode.position.start.x;
    const offsetY = clickPoint.y - clickedNode.position.start.y;

    setSelectedNode({
      ...clickedNode,
      offsetX,
      offsetY,
    });

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === clickedNode.id) {
          node = {
            ...node,
            selected: true,
          };
        }

        if (node.id !== clickedNode.id) {
          node = {
            ...node,
            selected: false,
          };
        }

        return node;
      }),
    );
  }

  // Click on empty space
  if (!clickedNode) {
    if (group) group.clear();

    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.selected) {
          node = {
            ...node,
            selected: false,
          };
        }
        return node;
      }),
    );
  }
};

export const moving = (
  movingPoint: Point2D,
  selectedNode: SelectedNode,
  setNodes: StoreTypes.StoreType["actions"]["setNodes"],
) => {
  const width = selectedNode.position.end.x - selectedNode.position.start.x;
  const height = selectedNode.position.end.y - selectedNode.position.start.y;

  // We are subtracting mouse click point offset to the start point because
  // if we click on a distanced point to the start point
  // we don't want a jump to happen in the position of the line
  const newStartPoint = {
    x: movingPoint.x - selectedNode.offsetX,
    y: movingPoint.y - selectedNode.offsetY,
  };

  const newEndPoint = {
    x: newStartPoint.x + width,
    y: newStartPoint.y + height,
  };

  setNodes((nodes) =>
    nodes.map((node) => {
      if (node.id === selectedNode.id) {
        node = {
          ...node,
          element: node.element.plot([
            newStartPoint.x,
            newStartPoint.y,
            newEndPoint.x,
            newEndPoint.y,
          ]),
          position: {
            start: newStartPoint,
            end: newEndPoint,
          },
        };
      }
      return node;
    }),
  );
};

export const resizing = (
  movingPoint: Point2D,
  selectedNode: SelectedNode,
  setNodes: StoreTypes.StoreType["actions"]["setNodes"],
) => {
  const coordinates = resizeLineCoordinates(
    movingPoint,
    selectedNode.clickPosition,
    selectedNode.position,
  );

  if (coordinates) {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === selectedNode.id) {
          node = {
            ...node,
            element: node.element.plot(
              coordinates.start.x,
              coordinates.start.y,
              coordinates.end.x,
              coordinates.end.y,
            ),
            position: {
              ...node.position,
              start: coordinates.start,
              end: coordinates.end,
            },
          };
        }
        return node;
      }),
    );
  }
};
