import { screen, render } from "@testing-library/react";
import { RouterWrapper } from "@/tests";
import Sidebar from "./Sidebar";

test("Sidebar renders correctly", () => {
  render(
    <RouterWrapper>
      <Sidebar />
    </RouterWrapper>,
  );

  const aside = screen.getByLabelText(/primary sidebar/i);
  const nav = screen.getByRole("navigation");
  const navList = screen.getByLabelText(/navigation list/i);

  expect(nav).toBeInTheDocument();
  expect(aside).toBeInTheDocument();
  expect(navList).toBeInTheDocument();
});
