const { readFromFile, readFromUrl, generateText } = require('./makeText');

describe('makeText.js', () => {
  test('readFromFile() should read text from a file', () => {
    const filePath = 'test.txt';
    const text = readFromFile(filePath);

    expect(text).toBeDefined();
    expect(text.length).toBeGreaterThan(0);
  });

  test('readFromUrl() should read text from a URL', async () => {
    const url = 'http://www.gutenberg.org/files/11/11-0.txt';
    const text = await readFromUrl(url);

    expect(text).toBeDefined();
    expect(text.length).toBeGreaterThan(0);
  });

  test('generateText() should generate random text', () => {
    const text = 'the cat in the hat';
    const generatedText = generateText(text, 5);

    expect(generatedText).toBeDefined();
    expect(generatedText.length).toBeGreaterThan(0);
  });
});
