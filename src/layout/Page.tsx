import { cn } from "@nextui-org/react";
import Header from "./Header";
import type { HeaderProps } from "./Layout.types";

type Props = {
  noPadding?: boolean;
  headerProps?: HeaderProps;
};

const Page: React.FC<React.PropsWithChildren<Props>> = ({
  noPadding,
  headerProps,
  children,
}) => {
  return (
    <div
      aria-label="Page content"
      className="relative flex flex-1 flex-col overflow-y-auto">
      <Header {...headerProps} />
      <div
        className={cn(
          "flex flex-1 flex-col overflow-y-auto",
          noPadding ? "" : "max-md:p-2 md:p-4",
        )}>
        {children}
      </div>
    </div>
  );
};

export default Page;
