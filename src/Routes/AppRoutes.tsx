import type { RouteObject } from "react-router-dom";
import HomePage from "@/pages/Home";

const Routes: RouteObject[] = [
  {
    id: "home",
    path: "/",
    element: <HomePage />,
  },
];

export default Routes;
