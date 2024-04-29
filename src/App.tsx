import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Routes from "@/Routes";
import Layout from "@/layout";
import Providers from "./Providers";
import Notfound from "./pages/Notfound";
import "@/styles/Global.css";
import "@/assets/fonts/inter/stylesheet.css";

const router = createBrowserRouter(
  [
    {
      path: "",
      element: <Providers />,
      children: [
        {
          path: "/",
          element: <Layout />,
          children: Routes,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ],
  { basename: "/" },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
