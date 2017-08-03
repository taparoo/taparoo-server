const queries = require('../db/queries');
const express = require('express');

const router = express.Router();

router.get('/users', (req,res,next) => {
  queries.getAll('user').then(users => {
    res.json(users)
  });
});
router.get('/beers', (req,res,next) => {
  queries.getAll('beer').then(beers => {
    res.json(beers);
  })
})
module.exports = router;
