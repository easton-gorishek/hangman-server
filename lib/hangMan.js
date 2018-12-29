const gameWords = [
  'RABBIT',
  'BUNNY',
  'CARROT',
  'LETTUCE',
  'BURROW',
  'FLUFFY',
  'FLOPPY',
  'LITTER',
  'PELLETS'
];

class Hangman {

  constructor(list) {
    this.list = list.slice();
    this.history;
  }

  init() {
    const randomIndex = Math.floor(Math.random() * this.list.length);
    const game = {
      secretWord: this.list[randomIndex].split(''),
      tilesGuessed: Array(secretWord.length).fill('_'),
      guessRemaining: 8
    }
    return Object.assign({}, game, { secretWord: undefined });
  }
}

let hangMan = new Hangman(gameWords);

module.exports = hangMan;