import { memo } from "react";
import useStore from "../store";
import { actions } from "../SVGDrawer.constants";
import { distance, angle } from "../SVGDrawer.functions";

const Information: React.FC = () => {
  const [nodes, selectedNode, actionMode] = useStore((store) => [
    store.states.nodes,
    store.states.selectedNode,
    store.states.actionMode,
  ]);

  const node = nodes.find((node) => node.id === selectedNode?.id);

  if (
    !node ||
    (actionMode !== actions.moving && actionMode !== actions.resizing)
  ) {
    return null;
  }

  const classNames = {
    wrapper:
      "border-standard absolute bottom-2 left-[50%] z-20 flex w-full max-w-[25rem] translate-x-[-50%] flex-col gap-1 rounded-small bg-[var(--sec-bg)] select-none",
    ID: "flex items-center bg-gray-200 p-2",
    length: "flex items-center justify-between p-2",
    angle: "flex items-center justify-between p-2",
  };

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.ID}>
        <h6>
          {node.category} ID: {node.id}
        </h6>
      </div>
      <div className={classNames.length}>
        <h6>Length:</h6>
        <p>{Math.trunc(distance(node.position.start, node.position.end))} cm</p>
      </div>
      <div className={classNames.angle}>
        <h6>Angle:</h6>
        <p>
          {Math.trunc(angle(node.position.start, node.position.end))}
          &deg;
        </p>
      </div>
    </div>
  );
};

const Memoized = memo(Information);

export default Memoized;
