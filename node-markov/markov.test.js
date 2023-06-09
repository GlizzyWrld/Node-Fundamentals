const MarkovMachine = require('./markov');

describe('MarkovMachine', () => {
  test('makeChains() should correctly build the markov chains', () => {
    const text = 'the cat in the hat';
    const expectedChains = new Map([
      ['the', ['cat', 'hat']],
      ['cat', ['in']],
      ['in', ['the']],
      ['hat', [null]],
    ]);

    const markovMachine = new MarkovMachine(text);
    expect(markovMachine.chains).toEqual(expectedChains);
  });

  test('makeText() should generate random text from the markov chains', () => {
    const text = 'the cat in the hat';
    const markovMachine = new MarkovMachine(text);
    const generatedText = markovMachine.makeText(1);
    const words = generatedText.split(' ');

    expect(words).toHaveLength(1);
  });
});
