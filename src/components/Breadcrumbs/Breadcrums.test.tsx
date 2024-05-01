import { screen, render } from "@testing-library/react";
import { RouterWrapper } from "@/tests";
import Breadcrumbs from "./Breadcrumbs";
import { getURL } from "./Breadcrumbs.functions";

test("Breadcrumbs renders correctly", () => {
  render(
    <RouterWrapper>
      <Breadcrumbs />
    </RouterWrapper>,
  );

  const breadcrumbs = screen.getByLabelText(/breadcrumbs/i);

  expect(breadcrumbs).toBeInTheDocument();
});

test("Get URL works correctly", () => {
  const case1 = getURL(["sample", "hello"], 2);
  const case2 = getURL(["sample", "hello", "world"], 1);
  const case3 = getURL(["sample", "hello", "world"], 2);

  expect(case1).toBe("/sample/hello");
  expect(case2).toBe("/sample/hello");
  expect(case3).toBe("/sample/hello/world");
});
