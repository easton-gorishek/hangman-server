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
  history: undefined,
  list: undefined
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
      gameStatus: null,
      fullWord: false,
      history: []
    }
    this.list.splice(randomIndex, 1);
    game.list = this.list;
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
    game.history.push(game.key);
    game.key = shortid.generate();
    if(game.secretWord.includes(body.guess)) {
      game.tilesGuessed = this.updateTiles(game, body.guess);
      this.checkGameStatus(game);
      this.history.push(game);
      return Object.assign({}, game, omit);
    }
    else {
      game.guessesRemaining = --game.guessesRemaining;
      this.checkGameStatus(game);
      this.history.push(game);
      return Object.assign({}, game, omit);
    }
  }

  checkGameStatus(game) {
    if(game.tilesGuessed.join('') === game.secretWord.join('')) {
      game.gameStatus = 'Game won';
    }
    else if(game.guessesRemaining <= 0) {
      game.gameStatus = 'Game lost';
    }
  }

  checkEntireWord(body) {
    let game = this.findGame(body.game);
    game.history.push(game.key);
    game.key = shortid.generate();
    game.fullWord = true;
    if(body.guess === game.secretWord.join('')) {
      game.gameStatus = 'Game won';
      this.history.push(game);
    }
    return Object.assign({}, game, omit);
  }

  loadGame(key) {
    const game = this.findGame(key);
    return Object.assign({}, game, omit);
  }
}

let hangMan = new Hangman(gameWords);

module.exports = hangMan;