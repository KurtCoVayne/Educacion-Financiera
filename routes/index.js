var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/problematica', (req, res ) =>{
  res.render('problematica');
});
router.get('/solucion', (req, res) => {
  res.render('solucion');
});
router.get('/ejemplos', (req, res) => {
  res.render('solucion');
});
router.get('/conceptos', (req, res) => {
  res.render('solucion');
});

module.exports = router;
