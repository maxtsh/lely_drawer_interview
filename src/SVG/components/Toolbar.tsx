import { memo } from "react";
import { Button } from "@nextui-org/react";
import { MdDraw, MdOutlineCleaningServices } from "react-icons/md";
import { LuGrab } from "react-icons/lu";
import useStore from "../store";
import { toolModes } from "../SVGDrawer.constants";
import type { ToolMode } from "../SVGDrawer.types";

const Toolbar: React.FC = () => {
  const [SVGContainer, toolMode, setNodes, selectToolMode] = useStore(
    (store) => [
      store.states.SVGContainer,
      store.states.toolMode,
      store.actions.setNodes,
      store.actions.setToolMode,
    ],
  );

  const classNames = {
    toolbar:
      "absolute flex gap-2 left-[50%] translate-x-[-50%] top-2 bg-[var(--sec-bg)] z-10 px-2 py-1 border-standard rounded-small",
  };

  const handleToolSelect = (tool: ToolMode) => {
    if (tool === toolModes.line) SVGContainer.css({ cursor: "crosshair" });
    if (tool !== toolModes.line) SVGContainer.css({ cursor: "default" });

    selectToolMode(tool);
  };

  const handleCleanCanvas = () => {
    SVGContainer.clear();
    setNodes([]);
  };

  return (
    <div className={classNames.toolbar}>
      <Button
        size="sm"
        radius="sm"
        variant="flat"
        aria-label="Draw"
        color={toolMode === toolModes.line ? "primary" : "default"}
        onClick={() => handleToolSelect(toolModes.line)}
        startContent={<MdDraw size={18} color="var(--icon)" />}>
        Draw
      </Button>
      <Button
        size="sm"
        radius="sm"
        variant="flat"
        aria-label="Select"
        color={toolMode === toolModes.selection ? "primary" : "default"}
        onClick={() => handleToolSelect(toolModes.selection)}
        startContent={<LuGrab size={18} color="var(--icon)" />}>
        Select
      </Button>
      <Button
        size="sm"
        radius="sm"
        isIconOnly
        variant="flat"
        color="default"
        aria-label="Clean"
        onClick={handleCleanCanvas}>
        <MdOutlineCleaningServices size={18} color="var(--icon)" />
      </Button>
    </div>
  );
};

export default memo(Toolbar);
