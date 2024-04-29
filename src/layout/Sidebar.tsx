import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, cn } from "@nextui-org/react";
import { BiHome } from "react-icons/bi";

const navigations = [{ id: "1", path: "/", icon: BiHome }];

const Sidebar: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelectMenu = (id: string, path?: string) => {
    setSelectedMenu(id);
    if (path) navigate(path);
  };

  return (
    <aside
      aria-label="Primary sidebar"
      className="relative flex w-[4rem] select-none flex-col bg-[var(--main-menu-bg)] max-sm:hidden">
      <div className="sidebar flex flex-1 flex-col">
        <div className="flex h-16 items-center justify-center border-b-[0.0625rem] border-solid border-b-[var(--border-dark-2)] p-1">
          <Image src="/images/Lely_Logo.png" width="100%" height="auto" />
        </div>
        <div className="flex flex-1 flex-col">
          <nav className="flex flex-[60%] flex-col overflow-y-auto overflow-x-hidden py-4">
            <ul
              aria-label="Navigation list"
              className="flex list-none flex-col gap-2">
              {navigations.map((nav) => (
                <li
                  key={nav.id}
                  aria-label={nav.id}
                  onClick={() => handleSelectMenu(nav.id, nav.path)}
                  className={cn(
                    "group relative flex cursor-pointer items-center rounded-bl-small rounded-br-[0] rounded-tl-small rounded-tr-[0]",
                    nav.id === selectedMenu
                      ? "active rounded-small bg-[var(--menu-active)]"
                      : "text-[var(--white)] hover:mx-1 hover:rounded-small hover:bg-[var(--menu-hover)]",
                  )}>
                  <div className="my-0 flex flex-1 px-[0.5rem] py-[0.625rem] no-underline">
                    <div className="flex flex-1 items-center justify-center gap-3 pl-0">
                      <nav.icon
                        role="img"
                        size={22}
                        className="group-hover:text-[var(--menu-active-icon)] group-[.active]:text-[var(--menu-active-icon)]"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
