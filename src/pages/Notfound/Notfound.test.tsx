import { render, screen } from "@testing-library/react";
import { RouterWrapper } from "@/tests";
import Notfound from "./Notfound";

test("Not found page should render correctly", () => {
  render(
    <RouterWrapper>
      <Notfound />
    </RouterWrapper>,
  );

  const title = screen.getByRole("heading");

  expect(title).toBeInTheDocument();
});
