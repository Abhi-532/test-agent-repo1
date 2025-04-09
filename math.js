function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { if (typeof a === 'number' && typeof b === 'number') { return a * b; } else { throw new Error('Invalid input'); } }
function divide(a, b) { if (b !== 0) { return a / b; } else { throw new Error('Division by zero'); } }
module.exports = { add, subtract, multiply, divide };