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

export const lineStyles = {
  default: {
    css: {},
    stroke: { color: "#000", width: 3, linecap: "round" },
  },
  selected: {
    css: {},
    stroke: { color: "var(--primary)", width: 3, linecap: "round" },
  },
};

export const markerStyles = {
  css: {
    color: "var(--primary)",
  },
};

export const lineClickPositions = {
  start: "start",
  end: "end",
  on: "on",
} as const;
