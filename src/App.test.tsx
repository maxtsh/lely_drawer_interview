import { render } from "@testing-library/react";
import App from "./App";
import RouterWrapper from "./tests/wrapper";

test("App should render correctly", () => {
  render(
    <RouterWrapper>
      <App />
    </RouterWrapper>
  );
});
