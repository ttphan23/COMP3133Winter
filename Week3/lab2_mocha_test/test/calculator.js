const { expect } = require("chai");
const calculator = require("../app/calculator");

describe("Calculator Tests", () => {

  // ADD
  // PASS: add(5,2) → 7
  it("add(5,2) PASS", () => {
    expect(calculator.add(5, 2)).to.equal(7);
  });

  // FAIL: add(5,2) ≠ 8
  it("add(5,2) FAIL", () => {
    expect(calculator.add(5, 2)).to.not.equal(8);
  });

  // SUB
  // PASS: sub(5,2) → 3
  it("sub(5,2) PASS", () => {
    expect(calculator.sub(5, 2)).to.equal(3);
  });

  // FAIL: sub(5,2) ≠ 5
  it("sub(5,2) FAIL", () => {
    expect(calculator.sub(5, 2)).to.not.equal(5);
  });

  // MUL
  // PASS: mul(5,2) → 10
  it("mul(5,2) PASS", () => {
    expect(calculator.mul(5, 2)).to.equal(10);
  });

  // FAIL: mul(5,2) ≠ 12
  it("mul(5,2) FAIL", () => {
    expect(calculator.mul(5, 2)).to.not.equal(12);
  });

  // DIV
  // PASS: div(10,2) → 5
  it("div(10,2) PASS", () => {
    expect(calculator.div(10, 2)).to.equal(5);
  });

  // FAIL: div(10,2) ≠ 2
  it("div(10,2) FAIL", () => {
    expect(calculator.div(10, 2)).to.not.equal(2);
  });

});
