const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
};

// Using Math functions for these
const sqrt = (num) => Math.sqrt(num);

const max = (a, b) => Math.max(a, b);

module.exports = { add, subtract, multiply, divide, sqrt, max };
