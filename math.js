function add(a, b) { return a + b; }

function subtract(a, b) { if (typeof a !== 'number' || typeof b !== 'number') { throw new Error('Inputs must be numbers'); } return a - b; }

function multiply(a, b) { return a * b; }

function divide(a, b) { if (b !== 0) { return a / b; } else { throw new Error('Division by zero'); } }

module.exports = { add, subtract, multiply, divide };