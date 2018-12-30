const router = require('express').Router();
const hangMan = require('../hangMan');

module.exports = router

  .get('/', ({ query }, res) => {
    res.json(hangMan.loadGame(query.game));
  })

  .get('/start-game', (req, res) => {
    res.json(hangMan.init());
  })

  .get('/previous-move', ({ query }, res) => {
    res.json(hangMan.previousMove(query.game))
  })

  .put('/', ({ body }, res) => {
    res.json(hangMan.update(body));
  })

  .post('/', ({ body }, res) => {
    res.json(hangMan.checkEntireWord(body))
  });