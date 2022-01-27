import { capitalize } from "./capitalize";

test("capitalize returns a string, capitalizing the first letter", () => {
  expect(capitalize("world")).toBe("World");
  expect(capitalize("richard")).toBe("Richard");
  expect(capitalize("academy scholars")).toBe("Academy scholars");
  expect(capitalize("")).toBe("");
  expect(capitalize("123 Hello!")).toBe("123 Hello!");
});
