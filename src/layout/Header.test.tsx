import { screen, render } from "@testing-library/react";
import Header from "./Header";
import { RouterWrapper } from "@/tests";

test("Header renders correctly", () => {
  render(
    <RouterWrapper>
      <Header />
    </RouterWrapper>,
  );

  const head = screen.getByLabelText("Header");
  const headerContent = screen.getByLabelText(/header content/i);
  const headerActions = screen.getByLabelText(/header actions/i);

  expect(head).toBeInTheDocument();
  expect(headerContent).toBeInTheDocument();
  expect(headerActions).toBeInTheDocument();
});
