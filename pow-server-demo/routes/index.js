var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Proof of Work using Bloom Filter and SHA256 Hash Function' });
});

module.exports = router;
