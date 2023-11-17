const processFile = require('./index'); // Adjust the path if necessary

describe('file processing', () => {
  it('processes the file without errors', async () => {
    await expect(processFile('testData/input.txt')).resolves.toBeUndefined();
  });

  it('throws and error if the file does not exist', async () => {
    await expect(processFile('')).rejects.toThrow();
  });
});
