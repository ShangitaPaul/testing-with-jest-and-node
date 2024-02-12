// markov.js

/** Textual markov chain generator */

class MarkovMachine {

  /** Build a Markov machine by processing the input text. */

  constructor(text) {
    // Split the input text into an array of words
    let words = text.split(/[ \r\n]+/);
    // Filter out any empty strings from the array
    this.words = words.filter(c => c !== "");
    // Generate the Markov chains
    this.makeChains();
  }
/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // Initialize an empty Map to store the Markov chains
    let chains = new Map();

    // Iterate over the words in the input text
    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      // Get the next word in the text, or null if it doesn't exist
      let nextWord = this.words[i + 1] || null;

      // Update the chains Map with the current word and its following word
      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    // Store the generated chains in the instance variable
    this.chains = chains;
  }

  /** Pick a random element from an array.
   */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** Generate random text from the Markov chains.
   */

  makeText(numWords = 100) {
    // Get an array of all keys (words) from the chains Map
    let keys = Array.from(this.chains.keys());
    // Choose a random key to start generating text
    let key = MarkovMachine.choice(keys);
    let out = [];

    // Continue generating text until reaching the specified number of words or a termination word (null)
    while (out.length < numWords && key !== null) {
      // Add the current word to the output
      out.push(key);
      // Choose a random next word from the array of words following the current word
      key = MarkovMachine.choice(this.chains.get(key));
    }

    // Return the generated text as a string
    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
}
