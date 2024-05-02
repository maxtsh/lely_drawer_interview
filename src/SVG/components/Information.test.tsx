import { render, screen } from "@testing-library/react";
import Information from "./Information";

test("Information renders correctly", () => {
  render(<Information />);

  const headings = screen.queryAllByRole("heading");

  headings.forEach((heading) => expect(heading).not.toBeInTheDocument());
});
