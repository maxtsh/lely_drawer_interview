import { MemoryRouter } from "react-router-dom";

const RouterWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};

export default RouterWrapper;
