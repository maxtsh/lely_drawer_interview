import { capitalizeFirstLetter } from "./string";

test("Capitalize first letter should work correctly", () => {
  const result1 = capitalizeFirstLetter("maxpayne");
  const result2 = capitalizeFirstLetter("");

  expect(result1).toContain("Maxpayne");
  expect(result2).toContain("");
});
