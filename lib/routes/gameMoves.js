const router = require('express').Router();
const hangMan = require('../hangMan');

module.exports = router

  .get('/start-game', (req, res) => {
    res.json(hangMan.init());
  })