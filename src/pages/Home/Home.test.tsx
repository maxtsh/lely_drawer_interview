import { screen, render } from "@testing-library/react";
import Home from "./Home";

test("Home page renders correctly", () => {
  render(<Home />);

  const heading = screen.getByRole("heading");

  expect(heading).toBeInTheDocument();
});
