const fs = require('fs');
const path = require('path');
const { readInput } = require('../index');

describe('readInput', () => {
  it('should read input.txt without errors', () => {
    const inputPath = path.join(__dirname, '..', 'input.txt');
    const input = fs.readFileSync(inputPath, 'utf-8');
    expect(() => readInput(input)).not.toThrow();
  });
});