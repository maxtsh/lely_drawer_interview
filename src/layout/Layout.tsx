import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout: React.FC = () => {
  return (
    <main className="flex h-[100dvh] overflow-y-auto">
      <div
        aria-label="Container"
        className="flex flex-1 overflow-y-auto bg-[var(--sec-bg)]">
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
