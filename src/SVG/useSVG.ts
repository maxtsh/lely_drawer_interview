import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useStore from "./store";
import {
  moving,
  drawing,
  resizing,
  selecting,
  createLine,
  createMarkers,
  getExactCoordinates,
  getElementOnClickedPosition,
} from "./SVGDrawer.functions";
import { actions, toolModes, lineStyles } from "./SVGDrawer.constants";
import type { G } from "@svgdotjs/svg.js";
import type { Props } from "./SVGDrawer.types";

const useSVG = <T extends HTMLElement = HTMLDivElement>(
  onLoad: Props["onLoad"],
) => {
  const wrapperRef = useRef<T>(null);
  const [group, setGroup] = useState<G | null>(null);
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

      setGroup(SVGContainer.group().id("general-group"));

      if (onLoad) onLoad(SVGContainer, wrapperRef.current);
    }

    return () => {
      SVGContainer.clear();
    };
  }, [SVGContainer, onLoad]);

  // Track Painting Stored Elements
  useEffect(() => {
    nodes.forEach((node) => {
      SVGContainer.add(node.element);

      if (node.selected) {
        node.element.stroke(lineStyles.selected.stroke.color);
        createMarkers(group, node);
      }

      if (!node.selected) {
        node.element.stroke(lineStyles.default.stroke.color);
      }
    });

    return () => {
      nodes.forEach((node) => {
        node.element?.defs()?.node?.remove();
        node.element.remove();
      });
    };
  }, [nodes, SVGContainer, group]);

  const handleMouseDown = (e: React.MouseEvent<T, MouseEvent>) => {
    const clickPoint = getExactCoordinates(
      e.clientX,
      e.clientY,
      wrapperRef.current,
    );

    // Selection
    if (toolMode === toolModes.selection) {
      selecting(
        clickPoint,
        nodes,
        group,
        setSelectedNode,
        setNodes,
        setActionMode,
      );
    }

    // Draw line
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

    const isMoving = actionMode === actions.moving;
    const isResizing = actionMode === actions.resizing;
    const isDrawing = actionMode === actions.drawing;

    //***** Drawing action */
    if (isDrawing) {
      drawing(movingPoint, nodes, SVGContainer, setNodes);
    }

    //***** Moving action */
    if (isMoving && selectedNode) {
      moving(movingPoint, selectedNode, setNodes);
    }

    //***** Resizing action */
    if (isResizing && selectedNode) {
      resizing(movingPoint, selectedNode, setNodes);
    }
  };

  const handleMouseUp = () => {
    if (actionMode === actions.drawing) {
      const latestIndex = nodes.length - 1;
      const latestElm = nodes.at(latestIndex);

      if (latestElm) {
        setSelectedNode({
          ...latestElm,
          offsetX: 0,
          offsetY: 0,
          clickPosition: "end",
        });

        // Unselected previous nodes and select the latest drawing node
        setNodes((nodes) =>
          nodes.map((node) => {
            if (node.selected && node.id !== latestElm.id) {
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

    if (actionMode !== actions.none) setActionMode(actions.none);
  };

  return {
    wrapperRef,
    SVGContainer,
    handleMouseUp,
    handleMouseMove,
    handleMouseDown,
  };
};

export default useSVG;
