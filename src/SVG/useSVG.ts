import { useEffect, useLayoutEffect, useRef } from "react";
import useStore from "./store";
import {
  createLine,
  getExactCoordinates,
  resizeLineCoordinates,
  getElementOnClickedPosition,
} from "./SVGDrawer.functions";
import { toolModes, actions, lineClickPositions } from "./SVGDrawer.constants";
import type { Props } from "./SVGDrawer.types";

const useSVG = <T extends HTMLElement = HTMLDivElement>(
  onLoad: Props["onLoad"],
) => {
  const wrapperRef = useRef<T>(null);
  const [
    nodes,
    toolMode,
    actionMode,
    selectedNode,
    SVGContainer,
    setNodes,
    setActionMode,
    setSelectedNode,
  ] = useStore((store) => [
    store.states.nodes,
    store.states.toolMode,
    store.states.actionMode,
    store.states.selectedNode,
    store.states.SVGContainer,
    store.actions.setNodes,
    store.actions.setActionMode,
    store.actions.setSelectedNode,
  ]);

  // Initialize
  useLayoutEffect(() => {
    if (wrapperRef.current) {
      SVGContainer.addTo(wrapperRef.current)
        .size("100%", "100%")
        .attr({ style: "z-index: 5;" });

      if (onLoad) onLoad(SVGContainer, wrapperRef.current);
    }

    return () => {
      SVGContainer.clear();
    };
  }, [SVGContainer, onLoad]);

  // Paint Stored Elements
  useEffect(() => {
    nodes.forEach((line) => SVGContainer.add(line.element));

    return () => {
      SVGContainer.clear();
    };
  }, [nodes, SVGContainer]);

  const handleMouseDown = (e: React.MouseEvent<T, MouseEvent>) => {
    const clickPoint = getExactCoordinates(
      e.clientX,
      e.clientY,
      wrapperRef.current,
    );

    // Move mode
    if (toolMode === toolModes.selection) {
      const clickedNode = getElementOnClickedPosition(
        clickPoint.x,
        clickPoint.y,
        nodes,
      );

      // Click on a node
      if (clickedNode) {
        // If clicked on the line we're moving it
        if (clickedNode.clickPosition === lineClickPositions.on) {
          setActionMode(actions.moving);
        }

        // If clicked on near start or end we're resizing it
        if (
          clickedNode.clickPosition === lineClickPositions.start ||
          clickedNode.clickPosition === lineClickPositions.end
        ) {
          setActionMode(actions.resizing);
        }

        // Calculating click point offset to the start point of the node
        const offsetX = clickPoint.x - clickedNode.position.start.x;
        const offsetY = clickPoint.y - clickedNode.position.start.y;

        setSelectedNode({ ...clickedNode, offsetX, offsetY });

        setNodes((nodes) =>
          nodes.map((node) => {
            // Set the current pointed node as selected
            if (node.id === clickedNode.id) {
              node = {
                ...node,
                selected: true,
              };
            }
            // Toogle select on nodes if they were selected before
            if (node.id !== clickedNode.id && node.selected) {
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
    }

    // Draw line mode
    if (toolMode === toolModes.line) {
      setActionMode(actions.drawing);

      const line = createLine(clickPoint, clickPoint, SVGContainer);

      setNodes((nodes) => nodes.concat(line));
    }
  };

  const handleMouseMove = (e: React.MouseEvent<T, MouseEvent>) => {
    const movingPoint = getExactCoordinates(
      e.clientX,
      e.clientY,
      wrapperRef.current,
    );

    // Change cursor to move on mouse over any elements in selection mode
    if (toolMode === toolModes.selection) {
      const movedOverNode = getElementOnClickedPosition(
        movingPoint.x,
        movingPoint.y,
        nodes,
      );

      if (movedOverNode) movedOverNode.element.css({ cursor: "move" });
    }

    if (actionMode === actions.none) return;

    // Moving action
    if (actionMode === actions.moving && selectedNode) {
      const width = selectedNode.position.end.x - selectedNode.position.start.x;
      const height =
        selectedNode.position.end.y - selectedNode.position.start.y;

      // We reduce mouse click point offset to the start point because
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
                ...node.position,
                start: newStartPoint,
                end: newEndPoint,
              },
            };
          }
          return node;
        }),
      );
    }

    // Drawing action
    if (actionMode === actions.drawing) {
      const latestIndex = nodes.length - 1;
      const latestElm = nodes.at(latestIndex);

      if (latestElm) {
        const updatedLine = createLine(
          { x: latestElm.position.start.x, y: latestElm.position.start.y },
          { x: movingPoint.x, y: movingPoint.y },
          SVGContainer,
        );

        setNodes((nodes) =>
          nodes.map((node, idx) => {
            if (idx === latestIndex) node = updatedLine;
            return node;
          }),
        );

        // Removing previous instances of line added by SVGContainer => There may probably be better way to do this
        // Instead of SVGContainer adding all the lines in createLine directly to the DOM, it gathers them in a single wrapper
        // And After every update in elements array, it gives the task to the useEffect
        updatedLine.element.remove();
      }
    }

    if (actionMode === actions.resizing && selectedNode) {
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
    }
  };

  const handleMouseUp = () => {
    if (actionMode !== actions.none) setActionMode(actions.none);
  };

  return {
    actionMode,
    wrapperRef,
    selectedNode,
    SVGContainer,
    handleMouseUp,
    handleMouseMove,
    handleMouseDown,
  };
};

export default useSVG;
