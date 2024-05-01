import { Page } from "@/layout";
import SVGDrawer from "@/SVG";

const Home: React.FC = () => {
  // const [nodes] = useSVGStore((store) => [store.states.nodes]);
  // console.log("Nodes in Home Page ===>", nodes);

  return (
    <Page headerProps={{ heading: "Home" }} noPadding>
      <div className="relative flex flex-1 flex-col">
        <SVGDrawer
          onLoad={() => {
            console.log("SVG IS Loaded!");
          }}
        />
      </div>
    </Page>
  );
};

export default Home;
