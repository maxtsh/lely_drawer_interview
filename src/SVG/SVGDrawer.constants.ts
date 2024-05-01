import type { StrokeData } from "@svgdotjs/svg.js";

export const toolModes = {
  none: "none",
  line: "line",
  selection: "selection",
} as const;

export const actions = {
  none: "none",
  moving: "moving",
  drawing: "drawing",
  resizing: "resizing",
} as const;

export const shapes = {
  line: "Line",
} as const;

export const lineStyles: {
  css: Partial<CSSStyleDeclaration>;
  stroke: StrokeData;
} = {
  css: {},
  stroke: { color: "var(--primary)", width: 3, linecap: "round" },
};

export const lineClickPositions = {
  start: "start",
  end: "end",
  on: "on",
} as const;
