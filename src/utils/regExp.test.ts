import { containNumber } from "./regExp";

test("Contain number reg exp should work correctly", () => {
  const result1 = containNumber("1234xz");
  const result2 = containNumber("xyz");

  expect(result1).toBeTruthy();
  expect(result2).toBeFalsy();
});
