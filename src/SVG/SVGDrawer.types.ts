import {
  shapes,
  toolModes,
  actions,
  lineClickPositions,
} from "./SVGDrawer.constants";
import type { Line, Svg } from "@svgdotjs/svg.js";

export type Props = {
  width?: string;
  height?: string;
  onLoad?: <T = HTMLDivElement>(svg: Svg, wrapper: T) => void;
};

export type ToolMode = keyof typeof toolModes;

export type ActionMode = keyof typeof actions;

export type Point2D = { x: number; y: number };

export type LineClickPositionType = keyof typeof lineClickPositions | null;

export type LineNode = {
  id: string;
  element: Line;
  selected: boolean;
  category: typeof shapes.line;
  connections: { start: Point2D | null; end: Point2D | null }; // TODO: For connecting to other lines
  position: {
    start: Point2D;
    end: Point2D;
  };
};

// Node Types, ex: Line, Rectangle etc...
export type NodeType = LineNode;

export type SelectedNode = {
  offsetY: number;
  offsetX: number;
  clickPosition: LineClickPositionType;
} & NodeType;
