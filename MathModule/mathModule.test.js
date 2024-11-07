// mathModule.test.js

const { add, subtract, multiply, divide, sqrt, max } = require("./mathModule");

describe("Math Module Tests", () => {
  test("adds two numbers", () => {
    expect(add(5, 3)).toBe(8);
  });

  test("subtracts two numbers", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("multiplies two numbers", () => {
    expect(multiply(7, 6)).toBe(42);
  });

  test("divides two numbers", () => {
    expect(divide(12, 4)).toBe(3);
  });

  test("throws error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });

  test("calculates square root of a number", () => {
    expect(sqrt(16)).toBe(4);
  });

  test("finds maximum of two numbers", () => {
    expect(max(10, 20)).toBe(20);
  });
});
