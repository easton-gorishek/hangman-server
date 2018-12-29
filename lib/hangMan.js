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
  }

  init() {
    const randomIndex = Math.floor(Math.random() * this.list.length);
    const secretWord = this.list[randomIndex];
    return secretWord;
  }
}

let hangMan = new Hangman(gameWords);

module.exports = hangMan;