import { screen, render } from "@testing-library/react";
import { RouterWrapper } from "@/tests";
import Page from "./Page";

test("Page renders correctly", () => {
  render(
    <RouterWrapper>
      <Page />
    </RouterWrapper>,
  );

  const pageContent = screen.getByLabelText(/page content/i);
  expect(pageContent).toBeInTheDocument();
});
