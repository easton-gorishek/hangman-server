const shortid = require('shortid');

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

const omit = { 
  secretWord: undefined,
  history: undefined
};

class Hangman {

  constructor(list) {
    this.list = list.slice();
    this.history = [];
  }

  init() {
    const randomIndex = Math.floor(Math.random() * this.list.length);
    const game = {
      key: shortid.generate(),
      secretWord: this.list[randomIndex].split(''),
      guessesRemaining: 8,
      history: []
    }
    game.tilesGuessed = Array(game.secretWord.length).fill('_');
    this.history.push(game);
    console.log('SECRET WORD', game.secretWord);
    return Object.assign({}, game, omit);
  }

  findGame(key) {
    return JSON.parse(JSON.stringify(this.history[this.history.findIndex(obj => obj.key === key)]));
  }

  updateTiles(game, guess) {
    return game.tilesGuessed.map((t, i) => guess === game.secretWord[i] ? guess : t);
  }

  update(body) {
    let game = this.findGame(body.game);
    if(game.secretWord.includes(body.guess)) {
      game.history.push(game.key);
      game.key = shortid.generate();
      game.tilesGuessed = this.updateTiles(game, body.guess);
      this.history.push(game);
      return Object.assign({}, game, omit);
    }
  }

}

let hangMan = new Hangman(gameWords);

module.exports = hangMan;