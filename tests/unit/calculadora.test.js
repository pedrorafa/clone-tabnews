const calculator = require("../models/calculator");

test("Sum should two numbers sum", () => {
  expect(calculator.sum(1, 1)).toBe(2);
  expect(calculator.sum(2, 1)).toBe(3);
  expect(calculator.sum(1, 2)).toBe(3);
  expect(calculator.sum(1, -1)).toBe(0);
});
