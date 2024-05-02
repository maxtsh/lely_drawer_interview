import { cn } from "@nextui-org/react";
import useSVG from "./useSVG";
import Toolbar from "./components/Toolbar";
import Background from "./components/Background";
import Information from "./components/Information";
import type { Props } from "./SVGDrawer.types";

const SVGDrawer: React.FC<Props> = ({
  width = "100%",
  height = "100%",
  onLoad,
}) => {
  const { wrapperRef, handleMouseUp, handleMouseDown, handleMouseMove } =
    useSVG(onLoad);

  const classNames = {
    container: cn(
      "relative flex flex-1 flex-col bg-[linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)]",
      `w-[${width}]`,
      `h-[${height}]`,
    ),
  };

  return (
    <div
      ref={wrapperRef}
      aria-label="Canvas"
      className={classNames.container}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}>
      <Toolbar />
      <Information />
      <Background />
    </div>
  );
};

export default SVGDrawer;
