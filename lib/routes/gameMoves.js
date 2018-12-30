const router = require('express').Router();
const hangMan = require('../hangMan');

module.exports = router

  .get('/', ({ query }, res) => {
    res.json(hangMan.findGame(query.game));
  })

  .get('/start-game', (req, res) => {
    res.json(hangMan.init());
  })

  .put('/', ({ body }, res) => {
    console.log('BODY!!!!', body);
    res.json(hangMan.update(body));
  })