import { memo } from "react";
import useStore from "../store";
import { distance, angle } from "../SVGDrawer.functions";

const Information: React.FC = () => {
  const [selectedNode] = useStore((store) => [store.states.selectedNode]);

  if (!selectedNode) return null;

  console.log("render");

  return (
    <div className="border-standard absolute bottom-2 left-[50%] z-20 flex w-full max-w-[25rem] translate-x-[-50%] flex-col gap-1 rounded-small bg-[var(--sec-bg)]">
      <div className="flex items-center bg-gray-200 p-2">
        <h6>
          {selectedNode.category} ID: {selectedNode.id}
        </h6>
      </div>
      <div className="flex items-center justify-between p-2">
        <h6>Length:</h6>
        <p>
          {Math.trunc(
            distance(selectedNode.position.start, selectedNode.position.end),
          )}{" "}
          cm
        </p>
      </div>
      <div className="flex items-center justify-between p-2">
        <h6>Angle:</h6>
        <p>
          {Math.trunc(
            angle(selectedNode.position.start, selectedNode.position.end),
          )}
          &deg;
        </p>
      </div>
    </div>
  );
};

export default memo(Information);
