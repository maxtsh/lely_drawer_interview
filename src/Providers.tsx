import { Outlet, ScrollRestoration } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";

function Providers() {
  return (
    <NextUIProvider>
      <Outlet />
      <ScrollRestoration />
    </NextUIProvider>
  );
}

export default Providers;
