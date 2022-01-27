import { shuffle } from "./shuffle";

test("shuffle returns a shuffled array", () => {
  expect(shuffle([])).toStrictEqual([]);
  expect(shuffle([1, 2, 3, 4, 5])).not.toEqual([1, 2, 3, 4, 5]);
  expect(shuffle(["a", "b", "c", "d", "e"])).not.toEqual([
    "a",
    "b",
    "c",
    "d",
    "e",
  ]);
  expect(
    shuffle([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
      [13, 14, 15],
    ])
  ).not.toEqual([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
  ]);
});
