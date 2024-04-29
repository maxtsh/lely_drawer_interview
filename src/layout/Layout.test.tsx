import { screen, render } from "@testing-library/react";
import { RouterWrapper } from "@/tests";
import Layout from "./Layout";

test("Layout component renders correctly", () => {
  render(
    <RouterWrapper>
      <Layout />
    </RouterWrapper>,
  );

  const main = screen.getByRole("main");
  const container = screen.getByLabelText(/container/i);

  expect(main).toBeInTheDocument();
  expect(container).toBeInTheDocument();
});
