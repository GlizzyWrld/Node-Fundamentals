/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nxtWord = this.words[i + 1] || null;
      if(chains.has(word)) {
        chains.get(word).push(nxtWord);
      } else{
        chains.set(word, [nxtWord]);
      }
    }
    this.chains = chains;
  }

  static randomChoice(arr) {
    if (!arr || arr.length === 0) {
      return null;
    }
    return arr[Math.floor(Math.random() * arr.length + 1)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.randomChoice(keys);
    let output = []

    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.randomChoice(this.chains.key);
    }
    return output.join(" ")

  }
}



module.exports = MarkovMachine

