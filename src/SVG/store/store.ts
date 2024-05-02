import { createWithEqualityFn } from "zustand/traditional";
import { shallow } from "zustand/shallow";
import { actions, toolModes } from "../SVGDrawer.constants";
import {
  ActionMode,
  NodeType,
  SelectedNode,
  ToolMode,
} from "../SVGDrawer.types";
import { SVG, type Svg } from "@svgdotjs/svg.js";

export type StoreType = {
  states: {
    SVGContainer: Svg;
    toolMode: ToolMode;
    actionMode: ActionMode;
    nodes: Array<NodeType>;
    selectedNode: SelectedNode | null;
  };
  actions: {
    setNodes: (
      nodes: Array<NodeType> | ((prev: Array<NodeType>) => Array<NodeType>),
    ) => void;
    setToolMode: (newMode: ToolMode) => void;
    setActionMode: (newActionMode: ActionMode) => void;
    setSelectedNode: (newSelectedNode: SelectedNode | null) => void;
    getStates: () => StoreType["states"];
    clear: () => void;
  };
};

export const initialStates: StoreType["states"] = {
  nodes: [],
  SVGContainer: SVG(),
  selectedNode: null,
  actionMode: actions.none,
  toolMode: toolModes.none,
};

const store = createWithEqualityFn<StoreType>(
  (set, get) => ({
    states: initialStates,
    actions: {
      setNodes: (newState) => {
        if (typeof newState === "function") {
          set((store) => ({
            ...store,
            states: { ...store.states, nodes: newState(store.states.nodes) },
          }));
        } else {
          set((store) => ({
            ...store,
            states: { ...store.states, nodes: newState },
          }));
        }
      },
      setToolMode: (newToolMode) =>
        set((store) => ({
          ...store,
          states: { ...store.states, toolMode: newToolMode },
        })),
      setActionMode: (newActionMode) =>
        set((store) => ({
          ...store,
          states: { ...store.states, actionMode: newActionMode },
        })),
      setSelectedNode: (newSelectedNode) =>
        set((store) => ({
          ...store,
          states: { ...store.states, selectedNode: newSelectedNode },
        })),
      getStates: () => get().states,
      clear: () => set((store) => ({ ...store, states: initialStates })),
    },
  }),
  Object.is,
);

const useStore = <T>(fn: (state: StoreType) => T) => store(fn, shallow);

export default useStore;
