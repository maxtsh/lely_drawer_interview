import { MemoryRouter } from "react-router-dom";

function RouterWrapper({ children }: React.PropsWithChildren) {
  return <MemoryRouter>{children}</MemoryRouter>;
}

export default RouterWrapper;
