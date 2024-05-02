import { renderHook, waitFor } from "@testing-library/react";
import useStore, { initialStates } from "./store";
import { actions, shapes, toolModes } from "../SVGDrawer.constants";
import { SVG } from "@svgdotjs/svg.js";

const svgContainer = SVG().line();

afterEach(() => {
  svgContainer.clear();
});

test("Use SVG store hook should work correctly", async () => {
  const nodes = [
    {
      id: "id",
      selected: false,
      category: shapes.line,
      element: svgContainer,
      connections: { start: null, end: null },
      position: { start: { x: 1, y: 1 }, end: { x: 2, y: 2 } },
    },
  ];

  const { result } = renderHook(() => useStore((store) => store));

  expect(result.current.states).toStrictEqual(initialStates);

  result.current.actions.setNodes(nodes);

  await waitFor(() => {
    expect(result.current.states.nodes).toStrictEqual(nodes);
  });

  result.current.actions.setActionMode(actions.drawing);

  await waitFor(() => {
    expect(result.current.states.actionMode).toStrictEqual(actions.drawing);
  });

  result.current.actions.setToolMode(toolModes.selection);

  await waitFor(() => {
    expect(result.current.states.toolMode).toStrictEqual(toolModes.selection);
  });

  result.current.actions.clear();

  await waitFor(() => {
    expect(result.current.states).toStrictEqual(initialStates);
  });
});
