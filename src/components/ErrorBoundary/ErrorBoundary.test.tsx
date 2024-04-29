import { render, screen } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const Sample = () => {
  throw new Error("My Error!");
};

test("Error boundary renders on throwing error", async () => {
  render(
    <ErrorBoundary>
      <Sample />
    </ErrorBoundary>,
  );

  const title = screen.getByRole("heading");
  const button = screen.getByRole("button");

  expect(title).toBeInTheDocument();
  expect(title).toHaveTextContent("Ooooooppps...!");

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("Retry");
});
