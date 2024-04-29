import Breadcrumbs from "@/components/Breadcrumbs";
import type { HeaderProps } from "./Layout.types";

interface Props extends HeaderProps {}

const Header: React.FC<Props> = ({ actions, heading }) => {
  return (
    <header
      aria-label="Header"
      className="flex h-[4rem] flex-col border-b-[0.0625rem] border-solid border-b-[var(--border)] bg-[var(--pm-bg)]">
      <div className="flex flex-1 flex-col px-7 py-1 max-md:px-2">
        <div aria-label="Header content" className="flex flex-1 items-center">
          <div className="flex items-center gap-2 overflow-hidden max-md:flex-1 md:flex-[50%]">
            <Breadcrumbs />
            <div className="flex flex-1 items-center overflow-hidden">
              {heading && heading}
            </div>
          </div>
          <div
            aria-label="Header actions"
            className="flex items-center justify-end gap-4 md:flex-[50%]">
            {actions}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
